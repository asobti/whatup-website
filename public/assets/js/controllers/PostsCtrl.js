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
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$routeParams', 'EventBus', 'Posts'];
