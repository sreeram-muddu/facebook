var mysql=require('./mysql');
var myquery=require('./myquery');
var pmysql=require('./connection');
exports.getGroups=function(req,res,callback)
{
	console.log('in getting groups block ');
	
	var gqry="select d.grpid,d.grpname,d.groupdesc from  facebook.groupd d where d.grpid in (select grpid from facebook.groupn where userid="+req.session.id+");";
	//var splr="SELECT @row:=0;";
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"getGroups",request: req, response: res});
	}
	else
		{
	dbConn.query(gqry,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		if(err)
			{
			console.log('failed to get groups');
			}
		else
			{
			console.log('successful in getting rows');
			res.send(rows);
			console.log(rows);
			}
	pmysql.returnDBconn(dbConn);
	});
	}
	
};

exports.maxgid=function(req,res)
{
var qry="select max(grpid) as mgid from facebook.groupd;";	
var dbConn = pmysql.getDBConn();
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"maxgid",request: req, response: res});
}
else
{
	dbConn.query(qry,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		if(!err)
	req.session.mgid=rows[0].mgid;
myquery.addgrp(req,res);
myquery.addmyself(req,res);
});


	
	}
pmysql.returnDBconn(dbConn);
	};




exports.addgrp=function(req,res)
{
req.session.mgid=req.session.mgid+1;	
var aqry="insert into facebook.groupd(grpid,grpname,groupdesc) values("+req.session.mgid+","+"'"+req.body.gname+"','"+req.body.gdesc+"');";

var dbConn = pmysql.getDBConn();
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"addgrp",request: req, response: res});
}
else
{
	dbConn.query(aqry,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		

	});
	pmysql.returnDBconn(dbConn);
}
};

exports.addmyself=function(req,res)
{
	
	var myadd="insert into facebook.groupn values("+req.session.id+","+req.session.mgid+");";
	console.log(myadd);
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"addmyself",request: req, response: res});
	}
	else
		{
	dbConn.query(myadd,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		

	});
	res.send('valid');
	pmysql.returnDBconn(dbConn);
	
		}
};
exports.deletegrp=function(req,res,callback)
{
var qry1="delete from facebook.groupd where grpid="+req.body.dg+";";
console.log(qry1);
var qry2="delete from facebook.groupn where grpid="+req.body.dg+";";
console.log(qry2);

var dbConn = pmysql.getDBConn();
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"deletegrp",request: req, response: res});
}
else
	{
	dbConn.query(qry1,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
			if(!err)
				{
				
				var dbConn = pmysql.getDBConn();
				if(dbConn==="empty")
				{
					pmysql.waitConnPool({name:"deletegrp",request: req, response: res});
				}
				else
					{
					dbConn.query(qry2,function(err,rows){
						process.nextTick(function(){
							pmysql.waitConnPool(null);
							if(!err)
								pmysql.returnDBconn(dbConn);
				
				});
					});
					}
				}
		});
		
		
	});
		


};};
exports.fetchpd=function(req,res,callback)
{
	var ppl="select userid,fname,lname from facebook.user;";
	console.log('In process of fetching details');
	console.log(ppl);
	
	
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"fetchpd",request: req, response: res});
	}
	else
		{
		dbConn.query(ppl,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
				if(!err)
					{
					res.send(rows);
					}
			});
		});
		pmysql.returnDBconn(dbConn);
		}
	
};
	
exports.addfrndgrp=function(req,res,callback)
{
var afg="insert into facebook.groupn values("+req.body.id+","+req.body.gid+");";

var dbConn = pmysql.getDBConn();
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"addfrndgrp",request: req, response: res});
}
else
	{
	dbConn.query(afg,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});});
	
	pmysql.returnDBconn(dbConn);
	}
};

exports.lpg=function(req,res,callback)
{
	var lst="select userid,fname from facebook.user where userid in (select userid from facebook.groupn where grpid="+req.body.gid+");";
	console.log(lst);
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"lpg",request: req, response: res});
	}
	else
		{
		dbConn.query(lst,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
				if(!err)
					res.send(rows);
			});
		});
		pmysql.returnDBconn(dbConn);
		}
};
exports.dp=function(req,res){
	
	var dpg="delete from facebook.groupn where userid ="+req.body.id+" and grpid = "+req.body.gid+";";
	
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"dp",request: req, response: res});
	}
	else
		{
		dbConn.query(dpg,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
			if(!err)
				res.send('valid');
		});
		}
	pmysql.returnDBconn(dbConn);
};
	
	
exports.getfrns=function(req,res){
	var mf="select fname from facebook.user where userid in (select frndid from facebook.frnds where userid="+req.session.id+");";
	console.log(mf);
	var dbConn = pmysql.getDBConn();
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"getfrns",request: req, response: res});
	}
	else
		{
		dbConn.query(mf,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
			if(!err && rows.length>0)
				res.send(rows);
			//else if(rows.length==0)
				//res.send('no friens');
		});
		pmysql.returnDBconn(dbConn);
		}
};


exports.sendreq=function(req,res){
var sfr="insert into facebook.frndreq values("+req.session.id+","+req.body.toid+","+req.body.status+");";
console.log('Requested for frnd req using query '+sfr);
var dbConn = pmysql.getDBConn();
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"sendreq",request: req, response: res});
}
else
	{
	dbConn.query(sfr,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
	});
	pmysql.returnDBconn(dbConn);
	}

};

exports.getfr=function(req,res){
	var dbConn = pmysql.getDBConn();
var gfr="select fname,userid from facebook.user where userid in ( select frmid from facebook.frndreq where toid="+req.session.id+" and "+"status=0);";
console.log('Query to fetch all frnd reqs '+gfr);
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"getfr",request: req, response: res});
}
else
	{
	dbConn.query(gfr,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		if(!err && rows.length==0)
			{
			var response={};
			response.status='No Friend Requests';
		res.send(response);
			}
		else if(!err && rows.length>0)
			{
		res.send(rows);	
			}
	
	});
	}
pmysql.returnDBconn(dbConn);
};

exports.accept=function(req,res){
	var dbConn = pmysql.getDBConn();	
var upd="update facebook.frndreq set status=1 where frmid="+req.body.frmid+" and toid="+req.session.id+";";
console.log(upd);
var ins1="insert into facebook.frnds values("+req.body.frmid+","+req.session.id+");";
console.log(ins1);
var ins2="insert into facebook.frnds values("+req.session.id+","+req.body.frmid+");";
console.log(ins2);

if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"accept",request: req, response: res});
}
else
	{
	dbConn.query(upd,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		if(dbConn==="empty")
		{
			pmysql.waitConnPool({name:"accept",request: req, response: res});
		}
		else
			{
			dbConn.query(ins1,function(err,rows){
				process.nextTick(function(){
					pmysql.waitConnPool(null);
				});
				if(dbConn==="empty")
				{
					pmysql.waitConnPool({name:"accept",request: req, response: res});
				}
				else
					{
					dbConn.query(ins2,function(err,rows){
						process.nextTick(function(){
							pmysql.waitConnPool(null);
						});
					});
					pmysql.returnDBconn(dbConn);
					}
			});
			}
	});
	pmysql.returnDBconn(dbConn);
	}};
exports.denial=function(req,res){
	var dbConn = pmysql.getDBConn();
	var upd="update facebook.frndreq set status=2 where frmid="+req.body.frmid+" and toid="+req.session.id+";";
	console.log(upd);

	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"denial",request: req, response: res});
	}
	else
		{
		dbConn.query(upd,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
              if(!err)
            	  res.send('completed');
			});
		});
		pmysql.returnDBconn(dbConn);

		}
};
	
exports.news=function(req,res){
	var dbConn = pmysql.getDBConn();
var post="insert into facebook.sfeed values("+req.session.id+","+"'"+req.body.s+"'"+");";	
if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"news",request: req, response: res});
}
else
	{
	dbConn.query(post,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
	});
	pmysql.returnDBconn(dbConn);

	}
};

exports.menfrns=function(req,res){
	var dbConn = pmysql.getDBConn();
	console.log(' Getting information related to me n frnds  ');
	var  fup="select userid,frndid from frnds where userid in ( select frndid from frnds where userid="+req.session.id+");";

	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"menfrns",request: req, response: res});
	}
	else
		{
		dbConn.query(fup,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
		 if(!err)
	     res.send(rows)
		});
		}
	pmysql.returnDBconn(dbConn);
	
};
exports.getposts=function(req,res){
	var dbConn = pmysql.getDBConn();
	console.log(' Getting information related to posts ');
var pos="select userid,post from sfeed where userid in ( select frndid from frnds where userid="+req.session.id+");";

if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"getposts",request: req, response: res});
}
else
	{
	dbConn.query(pos,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
		if(!err)
			res.send(rows);
	});
	}
pmysql.returnDBconn(dbConn);
};

exports.getgrpfrns=function(req,res){
	var dbConn = pmysql.getDBConn();
	console.log(' Getting information related to group frnds ');
var gpl="select userid,grpid from groupn where userid in (select frndid from frnds where userid="+req.session.id+");";


if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"getgrpfrns",request: req, response: res});
}
else
	{
	dbConn.query(gpl,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
       if(!err)
        res.send(rows);
	});
	}
pmysql.returnDBconn(dbConn);
};

exports.getbaseid=function(req,res){
	var dbConn = pmysql.getDBConn();
var basei="select userid,fname from user;";

if(dbConn==="empty")
{
	pmysql.waitConnPool({name:"getbaseid",request: req, response: res});
}
else
	{
	dbConn.query(basei,function(err,rows){
		process.nextTick(function(){
			pmysql.waitConnPool(null);
		});
     if(!err)
      res.send(rows);
	});
	}
pmysql.returnDBconn(dbConn);
};

exports.getbaseg=function(req,res){
	var dbConn = pmysql.getDBConn();
	var baseg="select grpid,grpname from groupd;";
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"getbaseg",request: req, response: res});
	}
	else
		{
		dbConn.query(baseg,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
			if(!err)
	           res.send(rows);
		});
		}
	pmysql.returnDBconn(dbConn);
};

exports.getprof=function(req,res){
	var dbConn = pmysql.getDBConn();
	var profile="select u.bday,p.* from facebook.user u inner join facebook.profile p on u.userid=p.userid where p.userid="+req.session.id+";";
	
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"getprof",request: req, response: res});
	}
	else
		{
		dbConn.query(profile,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
			if(!err)
				res.send(rows);
		
		});
		pmysql.returnDBconn(dbConn);
		}
	
};
	
exports.pstprofile=function(req,res){
	var dbConn = pmysql.getDBConn();
	var pstprfl = "insert into facebook.profile values("+req.session.id+",'"+req.body.school+"','"+req.body.city+"',"+req.body.phone+",'"+req.body.email+"','"+req.body.work+"') on duplicate key update school= values(school),city=values(city),email=values(email),work=values(work),phone=values(phone);";
	console.log(pstprfl);
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"pstprofile",request: req, response: res});
	}
	else
		{
		dbConn.query(pstprfl,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
		});
		pmysql.returnDBconn(dbConn);
		}
	
};
			
	
	
exports.pint=function(req,res){
	var dbConn = pmysql.getDBConn();
	var posted="insert into facebook.interest values("+req.session.id+",'"+req.body.soap+"','"+req.body.sport+"','"+req.body.music+"');";
	console.log(posted);
	if(dbConn==="empty")
	{
		pmysql.waitConnPool({name:"pint",request: req, response: res});
	}
	else
		{
		dbConn.query(posted,function(err,rows){
			process.nextTick(function(){
				pmysql.waitConnPool(null);
			});
		});
		pmysql.returnDBconn(dbConn);
		}
};
	
	
exports.gint=function(req,res){
	var dbConn = pmysql.getDBConn();
	var getint="select soap,sport,music from facebook.interest where userid="+req.session.id;
	//mysql.fetchData(function(err,results){
		if(dbConn==="empty")
		{
			pmysql.waitConnPool({name:"gint",request: req, response: res});
		}
		else
			{
			dbConn.query(getint,function(err,rows){
				process.nextTick(function(){
					pmysql.waitConnPool(null);
					if(!err)
						res.send(rows);
				});
			});
			pmysql.returnDBconn(dbConn);
			}
};
		
		