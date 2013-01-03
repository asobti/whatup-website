'use strict';

function PostsCtrl($scope, $http) {
		$scope.posts = [];
		$scope.fetchingPosts = true;

		var postsUrl = 	whatUp.apiRoot 
						+ 'posts'
						+ '?q={"order_by":[{"field":"created_at","direction":"desc"}]}';

		$http.get(postsUrl).success(function(posts) {			
			$scope.posts = posts.objects;
			$scope.fetchingPosts = false;			
		});		
}

// define injections
PostsCtrl.$inject = ['$scope', '$http'];