'use strict';

function SubscriptionsCtrl($scope, $http, $location, $routeParams, Subscriptions) {
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


}

// define injections
SubscriptionsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'Subscriptions'];

