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
		$scope.search = function() {
			console.log("Test");
			var searchData = $scope.searchData;
			console.log("Search called with " + searchData);
			Posts.query({"page":page, "q":"{\"filters\":[{\"name\":\"body\",\"op\":\"like\",\"val\":\"%"+searchData+"%\"}], \"order_by\":[{\"field\":\"created_at\",\"direction\":\"desc\"}]}"}, function(data){
				$scope.posts = data.objects;
				$scope.fetchingPosts = false;
				var paginationObj = {
					currentPage: data.page,
					totalPages: data.total_pages
				}
			});	

		}
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$routeParams', 'EventBus', 'Posts'];
