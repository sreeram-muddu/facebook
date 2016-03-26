
var fb=angular.module('fb',['ngRoute']);



//special service for storing basic data




fb.config(function($routeProvider){

$routeProvider



.when('/overview',{
	
	templateUrl:'views/cg.ejs',
	controller:'overlook'
	})
	.when('/interest',{
	
	templateUrl:'views/interest.ejs',
	controller:'int'
	})
.when('/creategroup',{
	
	templateUrl:'views/cg.ejs',
	controller:'cg'
	})
.when('/profile',{
	
	templateUrl:'views/profile.ejs',
	controller:'overlook'
	})
	.when('/work',{
	
	templateUrl:'views/work.ejs',
	controller:'work'
	})
	.when('/contacts',{
	
	templateUrl:'views/contact.ejs',
	controller:'contact'
	})
	.when('/life',{
	
	templateUrl:'views/life.ejs',
	controller:'life'
	})
	
.when('/group/:n',{
	
	templateUrl:'views/group.ejs',
	controller:'overview'
	})
.when('/decision/:d',{
	controller:'overview'
})
.otherwise({
        templateUrl:'views/newsfeed.ejs',
        	controller:'news'
        		});

});

//controller for profile information.

	
fb.controller('overlook',['$scope','$http',function($scope,$http){
	console.log('In overlook controller ');
	$http.get('/prof').success(function(data){
		$scope.city=data[0].city;
		$scope.phn=data[0].phone;
		$scope.email=data[0].email;
		$scope.org=data[0].work;
		$scope.school=data[0].school;
		$scope.bday=(data[0].bday).substr(0,10);
		
	})
	$scope.prof=function()
	{
		console.log('You are about to update personal information .');
		console.log($scope.city);
		console.log($scope.email);
		console.log($scope.phn);
		console.log($scope.school);
		console.log($scope.org);
		var formdata={city:$scope.city,email:$scope.email,phone:$scope.phn,school:$scope.school,work:$scope.org};
		
		$http.post('/postprofile',formdata).success(function(data){
			
		});
		
	}
	}]);
		
fb.controller('work',['$scope','$http',function($scope,$http){
	console.log('In work controller ');
	}]);
		
fb.controller('contact',['$scope','$http',function($scope,$http){
	console.log('In contact controller ');
	}]);
		
fb.controller('life',['$scope','$http',function($scope,$http){
	console.log('In life controller ');
	}]);
		




//controller for Login Authentication

fb.controller('homelogin',['$scope','$http',function($scope,$http){
	console.log('In home login controller ');
   $scope.email="sreeram.muddu@gmail.com";
   
	$scope.sendlogin=function(){
		if($scope.email==null||$scope.pass==null)
			   alert('Require all login fields');
		
		   else
			   {
		var formdata={email:$scope.email,pass:$scope.pass};
		$http.post('/login',formdata).then(function(response){
			console.log(response);
			if(response.data=="valid")
				{
			//console.log(response);
			window.location.assign("/homepage");
				}
			else
				window.location.assign("/fail");
			//response.render('output');
		},function(response){
			
		});
	}
	   }
}]);




//controller for adding frnd to group



//controller for group creation

fb.controller('cg',['$scope','$http',function($scope,$http){
	console.log('In create group controller ');
	$scope.gname="test";
	$scope.crtgrp=function()
	{
		console.log('About to post group creation');
		var formdata={gname:$scope.gname,gdesc:$scope.gdesc};
		$http.post('/cg',formdata).then(function(response){
			console.log(response);
			if(response.data=="valid")
				{
			//console.log(response);
			window.location.assign("/homepage");
				}
			else
				window.location.assign("/fail");
			//response.render('output');
		},function(response){
			
		});
		
	}
}]);






//controller for basic user

fb.controller('overview',['$scope','$http','$sce','$routeParams',function($scope,$http,$sce,$routeParams)
{
	
	$scope.dl=[];

console.log('In overview controller ');
//console.log($scope.data[$scope.row].grpid);
//console.log($scope.data[$scope.row].grpid);
$http.get('/fr').success(function(data){
	$scope.frndreqs=data;
});

	$http.get('/basic').success(function(data)
			{
		console.log('All group details obtained are '+data);
		//console.log(data.groups[0].grpname);
       for(i=0;i<data.length;i++)
    	   console.log(data[i].grpid);
        			$scope.data=data;	
		console.log($scope.data);;
        	
		console.log('Before fetching details of all users ');
		
		});
	$http.get('/pd').success(function(data){
		console.log('All persons details obtainer are '+data);
		$scope.wholefrnds=data;
		for(i=0;i<data.length;i++)
			{
			console.log(data[i].userid+" "+data[i].fname+" "+data[i].lname);
			$scope.dl[i]="<option value=\""+data[i].fname+" "+data[i].lname+"\">";
			console.log($scope.dl[i]);
			$scope.dl[i]=$sce.trustAsHtml($scope.dl[i]);
			}
		
	});
	//Here fetching all the friends for a user
	$http.get('/gf').success(function(fdata){
		console.log(fdata);
		$scope.myfrnds=fdata;
	});
	$scope.accept=function(id){
		//console.log('your are going to accept this id '+id);
		var formdata={frmid:id,status:1};
		$http.post('/acpt',formdata).success(function(data){
	  		
		});
	};
	$scope.deny=function(id){
		var formdata={frmid:id,status:2};
       $http.post('/deny',formdata).success(function(data){
			
		});
		//console.log('your are going to delete this id '+id);
	};
	
	$scope.add=function(){
		
		console.log('The friend selected is '+$scope.frnd);
		
		if($scope.frnd!==undefined)
			{
			var frndid;
			alert('your group id is '+$scope.data[$scope.row].grpid);
			var grpid=$scope.data[$scope.row].grpid;
			for(i=0;i<$scope.wholefrnds.length;i++)
				{
				if($scope.frnd===$scope.wholefrnds[i].fname+" "+$scope.wholefrnds[i].lname)
					{
					alert('my friend id is '+$scope.wholefrnds[i].userid);
					frndid=$scope.wholefrnds[i].userid;
					var formdata={id:frndid,gid:grpid};
					$http.post('/addfg',formdata).success(function(response){
						window.location('/homepage');
					
					});	
					}
				}
		
			}
	}
	$scope.sf=function(){
		console.log('The friend selected is '+$scope.sfr);
		for(i=0;i<$scope.wholefrnds.length;i++)
		{
		if($scope.sfr===$scope.wholefrnds[i].fname+" "+$scope.wholefrnds[i].lname)
			{
			alert('my friend req id is '+$scope.wholefrnds[i].userid);
			//frndid=$scope.wholefrnds[i].userid;
			//var formdata={id:frndid,gid:grpid};
			//$http.post('/addfg',formdata).success(function(response){
				//window.location('/homepage');
			
			//});
			var formdata={toid:$scope.wholefrnds[i].userid,status:0};
			$http.post('/sfr',formdata).success(function(response){
				
			});
			}
		}
		
	};
	
	$scope.getid=function(row){
		//console.log('just clicked ');
		//console.log(pid);
	//$scope.row=row-1;
	//console.log('function with associated id is '+$scope.row);
	//console.log($scope.data[p].grpname);
		var searchTerm = row,
	    index = -1;
	for(var i = 0, len = $scope.data.length; i < len; i++) {
	    if ($scope.data[i].grpid === row) {
	        index = i;
	        console.log('Required index is '+index);
	        $scope.row=index;
	    
	        break;
	    }
	}
	var x={gid:$scope.data[$scope.row].grpid};
	$http.post('/lpg',x).success(function(fet){
		console.log('After posting lpg data');
		console.log(fet);
		$scope.lpg=fet;
		//window.location.reload();

		//console.log('Present Group is '+x.gid);
	});
	}
	
	$scope.dg=function()
	{
		var dgid={dg:$scope.data[$scope.row].grpid};
	$http.post('/dg',dgid).success(function(response){
		//window.location.reload();
	});	
	};
	$scope.dp=function(pid)
	{
		console.log('Person who gets deleted is '+pid);
		console.log(pid);
		console.log($scope.data[$scope.row].grpid);
		var formdata={id:pid,gid:$scope.data[$scope.row].grpid};
		$http.post('/dp',formdata).success(function(response){
			window.location.reload();
		});
	}


	//console.log($scope.data);
}]);

//controller for news feed

fb.controller('news',['$scope','$http',function($scope,$http)
 {
	
	console.log('In news feed controller ');
	//$scope.feed={};
	//$scope.groups={};
	//$scope.posts={};
	//$scope.baseid={};
	//$scope.mutualfrnds={};
	//$scope.baseg={};
	$scope.master=[];
	$http.get('/baseid').success(function(response){
		console.log('Before printing baseid response object ');
		console.log(response);
		$scope.baseid=response;
		console.log('Before printing $scope base id property onto console ');
		console.log($scope.baseid[0].userid);
		 //$scope.$apply();
	});
	
	$http.get('/baseg').success(function(response){
		$scope.baseg=response;
		$http.get('/post').success(function(response){
			$scope.posts=response;
			$http.get('/mutual').success(function(response){
				$scope.mutualfrnds=response;
				$http.get('/grp').success(function(response){
					$scope.groups=response;
					console.log('All information about posts obtained ');
					console.log($scope.posts);
					console.log('All information about the base id dumps ')
					console.log($scope.baseid);
					console.log('All information about the base group dumps ')
					console.log($scope.baseg);
					//fetching status updates...
					for(i=0;i<$scope.posts.length;i++)
					{
					
					for(j=0;j<$scope.baseid.length;j++)
						{
						//console.log('comparing '+$scope.posts[i].userid+' with '+$scope.baseid[j].userid);
						if($scope.posts[i].userid==$scope.baseid[j].userid)
							{
							//console.log($scope.baseid[j].fname+" updated his status:"+$scope.posts[i].post);
							$scope.master.push($scope.baseid[j].fname+" updated his status: "+$scope.posts[i].post);
							//console.log($scope.master);
							}
						}
					}
					console.log('All information contained in the groups information about my frnds');
					console.log($scope.groups);
					//from userid groupid fetch replacing grp id with group names.
					for(i=0;i<$scope.groups.length;i++)
					{
					
					for(j=0;j<$scope.baseg.length;j++)
						{
						//console.log('These are all groups ids ');
						//console.log('comparing '+$scope.groups[i].grpid+' with '+$scope.baseg[j].grpid);
						if($scope.groups[i].grpid==$scope.baseg[j].grpid)
							{
							$scope.groups[i].grpid=$scope.baseg[j].grpname;
							//console.log($scope.groups[i].grpid);
							}
						}
					}
					console.log('All the grp ids here should have group names ');
					console.log($scope.groups);
					// a mark until my successful retreival..
					
					//console.log('all userids in group ');
					//for(i=0;i<$scope.groups.length;i++)
					//	{
					//	console.log($scope.groups[i].userid);
					//	}
					//console.log('all userids in baseid dump ');
					//for(i=0;i<$scope.baseid.length;i++)
					//	{
					//	console.log($scope.baseid[i].userid+'nd their names '+$scope.baseid[i].fname);
					//	}
					
					//from userid and grpid fetch ..replacing userid with names.
					for(i=0;i<$scope.groups.length;i++)
					{
					
					for(j=0;j<$scope.baseid.length;j++)
						{
						//console.log('comparing '+$scope.groups[i].userid+' with '+$scope.baseid[j].userid);
						if($scope.groups[i].userid==$scope.baseid[j].userid)
							{
								$scope.groups[i].userid=$scope.baseid[j].fname;
						//	console.log($scope.groups[i].userid);
							}
						}
					}
					console.log('Now all the userids should also have their names')
					console.log($scope.groups);
					
					
					//fetching all details of the groups joining information.....
					console.log(' person name and the group he joined ');
					for(i=0;i<$scope.groups.length;i++)
						{
						console.log($scope.groups[i].userid+'  joined the group '+$scope.groups[i].grpid );
						$scope.master.push($scope.groups[i].userid+'  joined the group '+$scope.groups[i].grpid);
						}
					console.log('Printing master news feed array : should have posts and groups information');
					console.log($scope.master);
					
					console.log('Mutual friends scope raw from server');
					console.log($scope.mutualfrnds);
					for(i=0;i<$scope.mutualfrnds.length;i++)
						{
						for(j=0;j<$scope.baseid.length;j++)
							{
							if($scope.mutualfrnds[i].userid==$scope.baseid[j].userid)
								{
								$scope.mutualfrnds[i].userid=$scope.baseid[j].fname;
								}
							if($scope.mutualfrnds[i].frndid==$scope.baseid[j].userid)
							{
							$scope.mutualfrnds[i].frndid=$scope.baseid[j].fname;
							}
							}
						}
                   console.log('All the information about recently got to gether as frnds ');
                   console.log($scope.mutualfrnds);
                   for(i=0;i<$scope.mutualfrnds.length;i++)
                	   {
                	   $scope.master.push($scope.mutualfrnds[i].frndid+ ' is now friend with '+ $scope.mutualfrnds[i].userid);
                	   }
                   console.log('All the news feed obtained are ');
                   console.log($scope.master);
                   for(var j, x, i = $scope.master.length; i; j = Math.floor(Math.random() * i), x = $scope.master[--i], $scope.master[i] = $scope.master[j], $scope.master[j] = x);
                   
               
					
					
					
					
					
					
					
					 //$scope.$apply();
				});
				 //$scope.$apply();
			});
			// $scope.$apply();
		});
		 //$scope.$apply();
	});
	//$http.get('/post').success(function(response){
		//$scope.posts=response;
		// $scope.$apply();
	//});
	//$http.get('/mutual').success(function(response){
		//$scope.mutualfrnds=response;
		 //$scope.$apply();
	//});
	//$http.get('/grp').success(function(response){
		//$scope.groups=response;
		 //$scope.$apply();
	//});
	//console.log('Base group ids is '+typeof $scope.baseid);
	//console.log($scope.baseid);
	//console.log('Before gng to for loop comparison ');
		
	//for(i=0;i<$scope.posts.length;i++)
		//{
		
		//for(j=0;j<$scope.baseid.length;j++)
			//{
		//	console.log('comparing '+$scope.posts[i].userid+' with '+$scope.baseid[j].userid);
			//if($scope.posts[i].userid==$scope.baseid[j].userid)
				//{
				//console.log($scope.baseid[j].fname+" updated his status "+$scope.posts[i].post);
				//}
			//}
	//	}
		
	$scope.post=function(){
	console.log('You are trying to post this status '+$scope.stat);
	var formdata={s:$scope.stat};
	$http.post('/status',formdata).success(function(response){
		window.location.reload();
		
	});
	
	
	
		
	}
}]);

//controller for interests
fb.controller('int',['$scope','$http',function($scope,$http){
console.log('In interest controller');
$http.get('/inter').success(function(data){
	console.log(data);
$scope.music=data[0].music;
$scope.sport=data[0].sport;
$scope.soap=data[0].soap;

});
$scope.sendinterest=function(){
var formdata={music:$scope.music,soap:$scope.soap,sport:$scope.sport};
	$http.post('/int',formdata).success(function(data){
		
	});
};
}]);

//Controller for signup user

fb.controller('sign',['$scope','$http',function($scope,$http){
	console.log('In Sign up controller');
	
		
	  $scope.signup=function()
	  {
		  var patt = new RegExp("!@#$%^&*()+=-[]\';,./{}|");	  
		  console.log('In signup method of sing controller ');
		  if($scope.sfname==null||$scope.slname==null||$scope.semail==null||$scope.spass==null ||$scope.sbday==null)
			 {
			  alert('all fields are required ');
			 } 

		  else
			  {
			var dataobject=$scope.sbday;
			var month = dataobject.getUTCMonth() + 1; //months from 1-12
			var day = dataobject.getUTCDate();
			var year = dataobject.getUTCFullYear();
			console.log(year+"-"+month+"-"+day);

			newdate = year + "-" + month + "-" + day;
		  var formdata={fname:$scope.sfname,lname:$scope.slname,email:$scope.semail,password:$scope.spass,bday:newdate};
			if($scope.sg1)
		  formdata.gender=0;
		  else
			  formdata.gender=1;
	console.log(formdata);
	$http.post('/signup',formdata).then(function(response){
		console.log(response);
		if(response.data.rslt==='registered')
			{
			alert('email already registered');
			window.location.reload();
			}
		//

	}
	),function(response){
		
	}
	  };
	  }}]);


