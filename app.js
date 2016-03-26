
/**
 * Module dependencies.
 */
var myquery=require('./routes/myquery');
var connection=require('./routes/connection');
connection.initializeConnPool(100);
var express = require('express');
var mysql=require('./routes/mysql');
var session = require('client-sessions');
var routes = require('./routes');
var user = require('./routes/user');
var login = require('./routes/login');
var signup=require('./routes/signup');
var http = require('http');
var path = require('path');
var ejs=require('ejs');
var app = express();
//app.use(express.cookieParser());
app.use(session({   
	  
	cookieName: 'session',    
	secret: '123',    
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,  }));
// all environments
//app.use(app.router);
app.set('port', process.env.PORT || 2468);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/post',function(req,res){
myquery.getposts(req,res);	
});
app.get('/', routes.index);
app.get('/users', user.list);
app.post('/login',login.verify);
app.post('/signup',signup.register);
app.get('/logout',function(req,res){
	console.log('In log out call. I am about to destroy session');
	req.session.destroy();
	res.render('index.ejs');
});
app.get('/mutual',function(req,res){
myquery.menfrns(req,res);
});
app.post('/status',function(req,res){
	myquery.news(req,res);
});
app.post('/int',function(req,res){
	myquery.pint(req,res);
});
app.get('/inter',function(req,res){
	myquery.gint(req,res);
});
app.post('/sfr',function(req,res){
	myquery.sendreq(req,res);
});
app.get('/gf',function(req,res){
	myquery.getfrns(req,res);
});
app.get('/prof',function(req,res){
	myquery.getprof(req,res);
});
app.get('/grp',function(req,res){
	myquery.getgrpfrns(req,res);
});
app.post('/postprofile',function(req,res){
	myquery.pstprofile(req,res);
});
app.get('/basic',function(req,res){
	
	var fetch={};	
	myquery.getGroups(req,res,function(err,results){
		if(!err)
		fetch.groups=results;
		res.send(fetch);
		//console.log(fetch.groups);
	});
	
		
	
});
app.post('/dp',function(req,res){
	myquery.dp(req,res);
});
app.post('/cg',function(req,res){
	myquery.maxgid(req,res);
	
});
app.post('/lpg',function(req,res){
	myquery.lpg(req,res,function(err,results){
		
	});
});
app.get('/homepage',function(req,res){
if(req.session.email)
res.render('successLogin.ejs');		
else
res.render('index');	
});
app.get('/fr',function(req,res){
myquery.getfr(req,res);	
});
app.post('/acpt',function(req,res){
myquery.accept(req,res);	
});
app.post('/deny',function(req,res){
	myquery.denial(req,res);	
	});
app.post('/addfg',function(req,res){
	myquery.addfrndgrp(req,res,function(err,results){
		
	});
});
app.get('/fail',function(req,res){
	res.render('index');	
	});
app.post('/dg',function(req,res){
	console.log(req.body.dg);
	myquery.deletegrp(req,res,function(err,results){
		if(!err)
		{
			console.log('Here I am completed my deletion');
			//res.render('successLogin.ejs');
			res.send('valid');
			
	}});
});
app.get('/pd',function(req,res){
console.log('In process of fetching all details of people ');
myquery.fetchpd(req,res,function(err,results){
	if(!err){
		
	}
});
});
app.get('/baseid',function(req,res){
myquery.getbaseid(req,res);	
});
app.get('/baseg',function(req,res){
myquery.getbaseg(req,res);	
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
