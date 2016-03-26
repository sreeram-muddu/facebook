var mysql=require('./mysql');
var ejs=require('ejs');
exports.register=function(req,res)
{
	
		
	console.log('In regiser server');
	var chk=" select * from user where email='"+req.body.email+"';";
	console.log('Checking if email exists or not');
	console.log(chk);
	//res.render('output');
	mysql.fetchData(function(err,results){
		if(results.length>0)
			{
			console.log('email already registered');
			res.send({rslt:'registered'});
			return;
		    //ejs.renderFile('./views/failLogin.ejs');
	        }
		 else
			{
			
			var qry="insert into user(fname,lname,email,password,bday,gender)values("+"'"+req.body.fname+"','"+req.body.lname+"','"+req.body.email+"',(aes_encrypt('"+req.body.password+"','d033e22ae348aeb5660fc2140aec35850c4da997'))"+",'"+req.body.bday+"',"+req.body.gender+");";
			console.log(qry);
			mysql.fetchData(function(err,results){
				
				if(err){
					throw err;
				}
				else{
					console.log('Insert query submitted successfully ');
					//res.send('completed');
				}
			
				  
			},qry);
			
			}
			
	},chk);
	
};