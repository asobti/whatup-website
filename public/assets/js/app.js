'use strict';

var whatUp = angular.module('projectWhatUp', ['whatUpServices'])
				.config(['$routeProvider', function($routeProvider) {
					$routeProvider
						.when('/posts', {
							templateUrl : 'partials/posts.html',
							controller : PostsCtrl
						})
						.when('/posts/new', {
							templateUrl : 'partials/new_post.html',
							controller : PostCtrl
						})
						.when('/posts/:page', {
							templateUrl : 'partials/posts.html',
							controller : PostsCtrl
						})
						.otherwise({
							redirectTo : '/posts'
						})
				}]);


// define API root url
whatUp.apiRoot = "http://projectwhatup.us:5000/api/";


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
