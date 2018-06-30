var app = angular.module('myApp', []);

// var data = results;
// var json = JSON.stringify(data);
// var blob = new Blob([json], {type: "application/json"});
// var url  = URL.createObjectURL(blob);

// var a = document.createElement('a');
// a.download    = "backup.json";
// a.href        = url;
// a.textContent = "Download backup.json";

// document.getElementById('content').appendChild(a);

app.controller('myCtrl', function($scope, TwitterService){
	$scope.getUser = function(username){
		console.log("username entered ", username);
		TwitterService.getUser(username)
		    .then(function(data){
		        $scope.twitterErrors = undefined;
	        	$scope.results = JSON.parse(data.result.userData);
	   //      	var data = data.result.userData;
	   //      	var json = JSON.stringify(data);
	   //      	var blob = new Blob([json], {type: "application/json"});
	   //      	var url  = URL.createObjectURL(blob);
	   //      	var a = document.createElement('a');
	   //      	a.download    = "backup.json";
				// a.href        = url;
				// a.textContent = "Download backup.json";

				// document.getElementById('content').appendChild(a);

		    })
		    .catch(function(error){
		        console.error('there was an error retrieving data: ', error);
		        $scope.twitterErrors = error.error;
		    })
	}
  
});

app.factory('TwitterService', function($http, $q){
  
  var getUser = function(username){
    var d = $q.defer();
    $http.post('/twitter/user', {username : username})
      .success(function(data){
        return d.resolve(data);
      })
      .error(function(error){
        return d.reject(error);
      });
    return d.promise;
  };

  return {
    getUser : getUser
  }
});