'use strict';

function SubscriptionsCtrl($scope, $http, $location, $routeParams, Subscriptions, Users) {
		$scope.currentTag = '';	
		$scope.tags = [];

		$http.defaults.withCredentials = true;
		var update = function() {
			Subscriptions.query({}, function(data){
					console.log(data);
					$scope.subscriptions = data.objects;
			});	
		};


		update();


		Users.query({}, function(data){
				console.log(data);
				
		});

		$scope.save = function() {
			Subscriptions.create({
					"subscribee": {
						"alias":$scope.subUser
					}, 
					"tags" : $scope.tags
			}, function(){ 
				clearForm();
				update();
			});
		};
		
		var clearForm = function() {
			$scope.subUser = "";
			$scope.currentTag = "";
			$scope.tags = [];
		};

		$scope.cancel = function() {				
			if (confirm("Are you sure you want to discard this subscription?")) {
				//clear fields.
				clearForm();
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
		};

		$scope.removeTag = function(tagName) {
			var index = angular.pluckIndex($scope.tags, 'name', tagName);

			if (index !== -1) {
				$scope.tags.splice(index, 1);
			}
		};
}

// define injections
SubscriptionsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'Subscriptions', 'Users'];

