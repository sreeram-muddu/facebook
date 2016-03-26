var mysql = require('mysql');
var queue = require('queue');
//var conPool = require('./enableConnectionPooling');
//var conPool = require('./enableConnectionPooling');
var user = require('./user');
//var connPool = new queue();
var connPool = new queue();
var waitQueue = new queue();
var myquery=require('./myquery');

function dbConnect()
{
	var dbCon = mysql.createConnection({
		host     : '127.0.0.1',
		user     : 'root',
		password : 'password',
		database: 'facebook',
		port	 : 3306
	});
//	if(dbCon === undefined)
//		throw
	dbCon.connect();
	return dbCon;
}

function addConnection(dbCon)
{
	if(connPool !== null)
	{
		connPool.push(dbCon);
	}
}

function getConnection()
{
	if(connPool.length >= 1)
	{
		var dbConn = connPool.pop();
		return dbConn;
	}
}

function initializeConnPool(poolSize)
{
	if(connPool !== null)
	{
		connPool.start();
		for(var cnt = 0; cnt < poolSize; cnt++)
		{
			addConnection(dbConnect());
		}
	}
	if(waitQueue !== null)
	{
		waitQueue.start();
	}
}


function getPoolSize()
{
	if(connPool !== null)
	{
		return connPool.length;
	}
}

function waitConnPool(userRequest)
{
	// if connection pooling is not enabled return.
	
	if(connPool !== null){
		if(connPool.length <= 0){
			//add user request to wait queue here
			if(userRequest !== null)
			{
				waitQueue.push(userRequest);
			}
		}
		else{
			//process request from wait queue here
			if(waitQueue.length <= 0)
			{
				return;
			}
			waitQueue.reverse();
			var userReq = waitQueue.pop();
			waitQueue.reverse();
			console.log("got user request " + userReq.name);
			
			switch(userReq.name){
				case "getGroups":
					myquery.getGroups(userReq.request, userReq.response,function(req,res){});
					break;
				case "maxgid":
					myquery.maxgid(userReq.request, userReq.response);
					break;
				case "addgrp":
					myquery.addgrp(userReq.request, userReq.response);
					break;
				case "addmyself":
					myquery.addmyself(userReq.request, userReq.response);
					break;
				case "deletegrp":
					myquery.deletegrp(userReq.request, userReq.response);
					break;
				case "fetchpd":
					myquery.fetchpd(userReq.request, userReq.response);
					break;
				case "addfrndgrp":
					myquery.addfrndgrp(userReq.request, userReq.response);
					break;
				case "lpg":
					myquery.lpg(userReq.request, userReq.response);
					break;
				case "dp":
					myquery.dp(userReq.request, userReq.response);
					break;
				case "getfrns":
					myquery.getfrns(userReq.request, userReq.response);
					break;
				case "sendreq":
					myquery.sendreq(userReq.request, userReq.response);
					break;
				case "getfr":
					myquery.getfr(userReq.request, userReq.response);
					break;
				case "accept":
					myquery.accept(userReq.request, userReq.response);
					break;
				case "denial":
					myquery.denial(userReq.request, userReq.response);
					break;
				case "news":
					myquery.news(userReq.request, userReq.response);
					break;
				case "menfrns":
					myquery.menfrns(userReq.request, userReq.response);
					break;
				case "getposts":
					myquery.getposts(userReq.request, userReq.response);
					break;
				case "getgrpfrns":
					myquery.getgrpfrns(userReq.request, userReq.response);
					break;
				case "getbaseid":
					myquery.getbaseid(userReq.request, userReq.response);
					break;
				case "getbaseg":
					myquery.getbaseg(userReq.request, userReq.response);
					break;
				case "getprof":
					myquery.getprof(userReq.request, userReq.response);
					break;
				case "pstprofile":
					myquery.pstprofile(userReq.request, userReq.response);
					break;
				case "pint":
					myquery.pint(userReq.request, userReq.response);
					break;
				case "gint":
					myquery.gint(userReq.request, userReq.response);
					break;
			}
		}
	}
}

function terminateConnPool()
{
	if(connPool !== null)
	{
		connPool.stop();
	}
	if(waitQueue !== null)
	{
		waitQueue.stop();
	}
}

/*DB helper functions*/
/*
 * This function return a database connection.
 * either a fresh connection if connection is 
 * not enabled or existing connection from
 * the pool.
 * it checks if the connection pooling is
 * enabled or not using the "isConnPool" variable
 * 
 * */
function getDBConn()
{
	var dbConn;
	
		if(getPoolSize() <= 0)
		{
			dbConn = "empty";
		}
		else{
			dbConn = getConnection();
	
		dbConn = dbConnect();
	}
    return dbConn;
}

/*
 * This function returns DB connection instance
 * to the connection pool after the query is 
 * executed or ends the DB connection if 
 * connection pooling is not enabled.
 * it checks if the connection pooling is
 * enabled or not using the "isConnPool" variable
 * 
 * */
function returnDBconn(dbConn)
{
	
		console.log("returning connection");
		addConnection(dbConn);
	

	{
		dbConn.end();
	}
}


exports.initializeConnPool = initializeConnPool;
exports.getDBConn = getDBConn;
exports.returnDBconn = returnDBconn;
exports.waitConnPool = waitConnPool;