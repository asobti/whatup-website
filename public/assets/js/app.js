'use strict';

var whatUp = angular.module('projectWhatUp', ['whatUpServices', 'ngSanitize'])
				.config(['$routeProvider', function($routeProvider) {
					$routeProvider
						.when('/posts', {
							templateUrl : 'partials/posts.html',
							controller : PostsCtrl
						})
						.when('/posts/edit/:postId', {
							templateUrl : 'partials/new_post.html',
							controller : PostCtrl
						})
						.when('/posts/view/:postId', {
							templateUrl : 'partials/view_post.html',
							controller : PostCtrl
						})
						.when('/posts/new', {
							templateUrl : 'partials/new_post.html',
							controller : PostCtrl
						})
						.when('/subscriptions', {
							templateUrl : 'partials/subscriptions_dialog.html',
							controller : SubscriptionsCtrl
						})
						.when('/posts/:page', {
							templateUrl : 'partials/posts.html',
							controller : PostsCtrl
						})
						.when('/tags/view/:tagId', {
							templateUrl : 'partials/tag-posts.html',
							controller : TagCtrl
						})
						.otherwise({
							redirectTo : '/posts'
						})
				}]);


// define API root url

whatUp.apiRoot = "http://api.projectwhatup.us/";
whatUp.loginRoot = "http://api.projectwhatup.us/";

// function that redirects user to login page if not logged in
whatUp.loginRedirect = function(path) {
	var redirectTo =  whatUp.loginRoot
					+ path
					+ "?next="
					+ window.location;
	
	window.location = redirectTo;
};
			

/*
	Utility function: pluckIndex
	Arguments : 
		haystack : the array to search through
		key, value : the kvp to search for
	Return :
		index of the item that contains the needle
		-1 if not found
*/
angular.pluckIndex = function(haystack, key, value) {

	// some basic sanity checks
	if (
				! haystack instanceof Array
			|| 	typeof key === 'undefined'
			|| 	typeof value === 'undefined'
			|| haystack.length <= 0
		) {
		return -1;
	}

	var index = -1;

	for(var i in haystack) {
		if (haystack[i][key] === value) {
			index = i;
			break;
		}
	}

	return index;
}
