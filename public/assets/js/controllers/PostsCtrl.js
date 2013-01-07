'use strict';

function PostsCtrl($scope, $http, $routeParams, eventBus, Posts) {
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;
		var data = Posts.query({"page":page, "q":"{\"order_by\":[{\"field\":\"created_at\",\"direction\":\"desc\"}]}"}, function(){
			$scope.posts = data.objects;
			$scope.fetchingPosts = false;
			var paginationObj = {
				currentPage: data.page,
				totalPages: data.total_pages
			}
			eventBus.pageChanged(paginationObj);
		});
	/*	
		$scope.posts = [];
		$scope.fetchingPosts = true;

		// get the page number. If none, then page 1
		var page = $routeParams.page || 1;

		var postsUrl = 	whatUp.apiRoot 
						+ 'posts'
						+ '?page=' + page
						+ '&q={"order_by":[{"field":"created_at","direction":"desc"}]}';

		$http.get(postsUrl).success(function(posts1) {			
			$scope.posts = posts1.objects;
			$scope.fetchingPosts = false;

			var paginationObj = {
				currentPage : posts1.page,
				totalPages : posts1.total_pages
			};

			eventBus.pageChanged(paginationObj);
		});		
	*/
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$routeParams', 'EventBus', 'Posts'];
