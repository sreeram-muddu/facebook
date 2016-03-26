
var fb= angular.module('fb',[]);
fb.controller('homelogin',['$scope',function($scope){
	console.log('In controller ');
   $scope.email="sreeram.muddu@gmail.com";
	$scope.sendlogin=function(){
		
		console.log('hello');
	}
	
}]);