'use strict';

function PostsCtrl($scope, $http, $location, $routeParams, eventBus, Posts) {
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;

		var converter = new Attacklab.showdown.converter();

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
			
			var advancedSearchObj = getAdvancedSearch($scope.searchData);

			if(typeof $scope.searchData !== 'undefined' && $scope.searchData !== "") {
				// a non-empty search term was defined
				// create a filter and add it to the queryObj
				var filter = [
								{
									name : advancedSearchObj.name,
									op : advancedSearchObj.op,
									val : advancedSearchObj.val
								}
							];

				queryObj.filters = filter;
			}
			

			function getAdvancedSearch(searchData) {
				//need to clean this up a bit to be scalable.
				
				//defaults
				var name = "body";
				var op = "like";
				var val = searchData;

				//check for tag
				var tagPattern = /tag:(.*)/g;
				var tagMatch = tagPattern.exec(searchData);
				if (tagMatch  !== null) {
					name = "tags__name";
					op = "any";
					val = tagMatch[1];
				}

				var titlePattern = /title:(.*)|topic:(.*)/g;
				var titleMatch = titlePattern.exec(searchData);
				if (titleMatch  !== null) {
					name = "topic";
					op = "like";
					if (typeof titleMatch[1] !== 'undefined') {
						val = titleMatch[1];
					} else {
						val = titleMatch[2];
					}
				}

	
				if (op == "like") {
					val = "%" + val + "%";  //other operators don't like the %
				}
				
				var search = {
					"name" : name,
					"op" : op,
					"val" : val
				};
				console.log(search);
				return search;
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

		$scope.htmlFromMarkdown = function(markdown) {
			return converter.makeHtml(markdown);
		};

		$scope.timeAgo = function(created_at) {
			//mark it with UTC time
			created_at += "Z";
			return $.timeago(created_at);
		};
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'EventBus', 'Posts'];

