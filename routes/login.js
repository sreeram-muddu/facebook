var mysql=require('./mysql');
var ejs=require('ejs');
exports.verify=function(req,res)
{
	//console.log(res);
	//console.log('reached verify method');
	//var getUser="select * from users where emailid='"+req.param("inputUsername")+"' and password='" + req.param("inputPassword") +"'";
	var qry="select * from user where email='"+req.body.email+"'"+" and cast(aes_decrypt(password,'d033e22ae348aeb5660fc2140aec35850c4da997')as char)='"+req.body.pass+"';";

	console.log(qry);
	//res.setHeader('content-type', 'text/html');
	//res.render('failLogin.ejs');
	mysql.fetchData(function(err,results){
		
	
		if(err){
			throw err;
		}
		else
		{
			if(results.length > 0)
			{
				//new EJS({url: '/template.ejs'}).render(data);
				console.log("valid Login");
				
				req.session.email=req.body.email;
				req.session.id=results[0].userid;
				req.session.mgid=0;
				//console.log(req.session.id);
				//console.log(req.session.data);
				res.send('valid');
				
			    //var qry="select max(grpid)as mgid from facebook.groupd;"
			    	//mysql.fetchData(function(err,results){
			    		//req.mgid=results[0].mgid;
			    	//},qry);
				//console.log('session created with '+req.session.email);
				//res.render('output');
				//res.render('output', { title: 'Express' });
				//qry="select d.grpname,d.groupdesc from  facebook.groupd d where d.grpid in (select grpid from facebook.groupn where userid="+req.session.data[0].userid+");";
				
				//console.log('Below is the query for getting groups data ');
				//console.log(qry);
				//mysql.fetchData(function(err,results){
					//if(err)
						//throw err;
					//else
				//{		
					//	req.session={groups:results};
						//console.log('Ready to make another query ');
						//req.session.groups=results;
						
						//console.log(req.session.groups[1].grpname);
					//	for (var i = 0; i < req.session.groups.length; i++) {
						//	  console.log(req.session.groups[i]);
							//};
				//return;
				//}		
				//},qry);
				//console.log('before rendering');
				//res.send(JSON.stringify('welcome'));
				//ejs.renderFile('./views/successLogin.ejs', { data: results } , function(err, result) {
			        // render on success
	
					//if (!err) {
			        	//console.log('Done with templating');
			            //res.end(result);
			        //}
			        // render or error
			       // else {
			         //   res.end('An error occurred');
			          //  console.log(err);
			        //}
			//}
			//);
			}
			else {    
				
				console.log('Invalid username and password ');
				//console.log(res);
				//console.log(typeof res.render);
				res.render('index');
				return;
			}
		}
		
	},qry);



};