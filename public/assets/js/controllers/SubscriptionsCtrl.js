'use strict';

function SubscriptionsCtrl($scope, $http, $location, $routeParams, Subscriptions) {
		$scope.currentTag = '';	
		$scope.tags = [];

		$http.defaults.withCredentials = true;
		Subscriptions.query({}, function(data){
				console.log(data);
				$scope.subscriptions = data.objects;
		});	

		$scope.save = function() {
			console.log("called save()");
		};

		$scope.cancel = function() {				
			if (confirm("Are you sure you want to discard this subscription?")) {
				//clear fields.
			}
		};

		$scope.tagFinished = function() {
			$scope.currentTag = $.trim($scope.currentTag);

			if ($scope.currentTag === '') return;
			
			if (angular.pluckIndex($scope.tags, 'name', $scope.currentTag) === -1) {
				$scope.tags.push({
					name : $scope.currentTag
				});
			}
			
			$scope.currentTag = '';	
			console.log('tag finished');	
		};

		$scope.removeTag = function(tagName) {
			var index = angular.pluckIndex($scope.tags, 'name', tagName);

			if (index !== -1) {
				$scope.tags.splice(index, 1);
			}
		};
}

// define injections
SubscriptionsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'Subscriptions'];

