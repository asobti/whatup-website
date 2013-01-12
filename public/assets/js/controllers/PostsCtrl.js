'use strict';

function PostsCtrl($scope, $http, $routeParams, eventBus, Posts) {
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;
		$scope.search = function() {
			var searchData = $scope.searchData;
			var filter = "\"filters\":[{\"name\":\"body\",\"op\":\"like\",\"val\":\"%"+searchData+"%\"}], "
			if(typeof searchData == 'undefined' || searchData == "") {
				filter = "";
			}
			Posts.query({"page":page, "q":"{"+filter+"\"order_by\":[{\"field\":\"created_at\",\"direction\":\"desc\"}]}"}, function(data){
				$scope.posts = data.objects;
				$scope.fetchingPosts = false;
				var paginationObj = {
					currentPage: data.page,
					totalPages: data.total_pages
				}
			});	
		}
		$scope.search();
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$routeParams', 'EventBus', 'Posts'];
