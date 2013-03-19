'use strict';

function SubscriptionsCtrl($scope, $http, $location, $routeParams, Subscriptions, Users) {
		$scope.currentTag = '';	
		$scope.tags = [];
	
		$scope.sub = new Subscriptions({
			subscribee : { 
				alias: ""
			},		
			tags : []
		});

		$http.defaults.withCredentials = true;
		var update = function() {
			$scope.subscriptions = Subscriptions.query({});	
			console.log($scope.subscriptions);
		};


		update();

		$scope.deleteSub = function(subscription) {

			if (confirm("Are you sure you want to delete this subscription?")) {
				var sub = new Subscriptions(subscription);
				sub.$delete(function(data){ 
					update();
				});
			}
		};

		$scope.editSub = function(subscription) {
			$scope.sub = new Subscriptions(subscription);
		};


		$scope.save = function() {
			console.log($scope.sub);
			if($scope.sub.subscribee.alias == "") {
				delete $scope.sub.subscribee;
			}	
			if(typeof $scope.sub.id === 'undefined') {
				$scope.sub.$create(function(){ 
					clearForm();
					update();
				}, function(resp) {
					console.log(resp);
				});
			} else {
				$scope.sub.$save(function(){ 
					clearForm();
					update();
				}, function(resp) {
					console.log(resp);
				});
			}
		};
		
		var clearForm = function() {
			$scope.sub = new Subscriptions({
				subscribee : { 
					alias: ""
				},		
				tags: []
			});
			$scope.currentTag = "";
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
			
			if (angular.pluckIndex($scope.sub.tags, 'name', $scope.currentTag) === -1) {
				$scope.sub.tags.push({
					name:$scope.currentTag
				});
			}
		};

		$scope.removeTag = function(tagName) {
			var index = angular.pluckIndex($scope.sub.tags, 'name', tagName);

			if (index !== -1) {
				$scope.sub.tags.splice(index, 1);
			}
		};
}

// define injections
SubscriptionsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'Subscriptions', 'Users'];

