'use strict';

function TagCtrl($scope, $http, $routeParams, Tags) {
	
	$scope.tag = 	Tags.get({
						tagId : $routeParams.tagId
					}, function(r) {	
						console.log($scope.tag);
					}, function(err) {
						if (err.status === 401) {
							whatUp.loginRedirect(err.data.url);
						}
					});

	
}

TagCtrl.$inject = ['$scope', '$http', '$routeParams', 'Tags'];