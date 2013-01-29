'use strict';

function PostsCtrl($scope, $http, $location, $routeParams, eventBus, Posts) {
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;

		var converter = new Attacklab.showdown.converter();

		$scope.search = function() {
			
			/*
			Helper functions
			*/
			
			function isDef(vari) {
				return typeof vari !== 'undefined';
			}
			
			function isBlank(vari) {
				return vari === "";
			}
		
			/*
			Links url param to the input box and vice versa
			*/

			var urlSearchParam = $location.search().q;
			var newSearchObjFromURL = { q: $scope.searchData };

			if (isDef($scope.searchData)) {
				$location.search(newSearchObjFromURL);
			} else if (isDef(urlSearchParam)) {
				$scope.searchData = urlSearchParam;
			}
	
			/*
			Precedence and rules:
				Match Exact:		\"(.*)\"
				Match Tag:		\[(.*)\]
				Match NOT:		-(.*)
				Match OR/Default:	(.*)( OR (.*))+
							(.*)( (.*))*
				Match AND:		(.*)( AND (.*))+

			TODO:
				Consider combining multiple matches for combined effect.

			*/

			function getSearchObj (searchData) {
				//\"(.*)\"
				var searchObj = {
					"hasFilters" : false,
					"hasDisjunctions" : true,
					"disjunctions" : [
						{ 
							"name" : "body",
							"op" : "like",
							"val" : "%" + searchData + "%"
						},

						{ 
							"name" : "topic",
							"op" : "like",
							"val" : "%" + searchData + "%"
						}
					]
				};
				var exactPattern = /(\"([^\"])*\")*/g;
				var exactMatch;
				var tmp = searchData;
				while (exactMatch = exactPattern.exec(tmp)) {
					console.log("init:" + tmp);
					console.log(exactMatch);
					var m = exactMatch[1];
					if (!isDef(m)) {
						break;
					}
					console.log(m);
					tmp = tmp.replace(m, "");
					console.log("rev:" + tmp);
				}
				return searchObj;
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
			
			var searchObj = getSearchObj($scope.searchData);
			console.log("<searchobj>");
			console.log(searchObj);
			console.log("</searchobj>");

			if(isDef($scope.searchData) && !isBlank($scope.searchData)) {
				// a non-empty search term was defined
				// add necessary filters and disjuncts
				if (searchObj.hasFilters) {
					queryObj.filters = searchObj.filters;
				}
				if (searchObj.hasDisjunctions) {
					queryObj.disjunctions = searchObj.disjunctions;
				}
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

