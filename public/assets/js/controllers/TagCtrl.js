'use strict';

function TagCtrl($scope, $http, $routeParams, Tags) {
	
	$scope.tag = Tags.get({
					tagId : $routeParams.tagId
				}, function(r) {	
					console.log($scope.tag);
				});

	
}

TagCtrl.$inject = ['$scope', '$http', '$routeParams', 'Tags'];