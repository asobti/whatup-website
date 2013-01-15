'use strict';

function PostsCtrl($scope, $http, $location, $routeParams, eventBus, Posts) {
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;

		$scope.search = function() {

			var current = $location.search().q;
			var newSearchObj = { q: $scope.searchData };

			if (typeof $scope.searchData !== 'undefined') {
				$location.search(newSearchObj);
			} else if (typeof current !== 'undefined') {
				$scope.searchData = current;
			}

			// basic query object that we use every time
			// gets posts in newest-to-oldest format
			var queryObj = {
				order_by : [
					{
						field : "created_at",
						direction : "desc"
					}
				]
			};

			if(typeof $scope.searchData !== 'undefined' && $scope.searchData !== "") {
				// a non-empty search term was defined
				// create a filter and add it to the queryObj
				var filter = [
								{
									name : "body",
									op : "like",
									val : "%" + $scope.searchData + "%"
								}
							];

				queryObj.filters = filter;
			}

			Posts.query({
					"page":page, 
					"q": JSON.stringify(queryObj)	//convert the query object to JSON
				}, function(data){
					$scope.posts = data.objects;
					$scope.fetchingPosts = false;

					var paginationObj = {
						currentPage: data.page,
						totalPages: data.total_pages
					}

					eventBus.pageChanged(paginationObj);
			});	
		}

		$scope.search();

		$scope.timeAgo = function(created_at) {
			//mark it with UTC time
			created_at += "Z";
			return $.timeago(created_at);
		};
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'EventBus', 'Posts'];

