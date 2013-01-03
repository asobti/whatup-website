'use strict';

function PostsCtrl($scope, $http, $routeParams) {
		$scope.posts = [];
		$scope.fetchingPosts = true;

		// get the page number. If none, then page 1
		var page = $routeParams.page || 1;

		var postsUrl = 	whatUp.apiRoot 
						+ 'posts'
						+ '?page=' + page
						+ '&q={"order_by":[{"field":"created_at","direction":"desc"}]}';

		$http.get(postsUrl).success(function(posts) {			
			$scope.posts = posts.objects;
			$scope.fetchingPosts = false;			
		});		
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$routeParams'];