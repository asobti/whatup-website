'use strict';

function PostsCtrl($scope, $http, $location, $routeParams, eventBus, Posts, Subscribed) {
		$http.defaults.withCredentials = true;
		// console.log($http.defaults);
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;

		var converter = new Attacklab.showdown.converter();

		$scope.mode = "recent";

		$scope.subscriptions = function() {
			$scope.mode = "subscribed";
			Subscribed.query({}, function(data) { 
				$scope.posts = data.objects;
				var paginationObj = {
					currentPage: data.page,
					totalPages: data.total_pages
				}

				eventBus.pageChanged(paginationObj);

			});

		};

		$scope.search = function() {
			$scope.mode = "recent";
			/*
			Helper functions
			*/
			
			function isDef(vari) {
				return typeof vari !== 'undefined';
			}
			
			function isBlank(vari) {
				return vari === "";
			}
		
			function trimString(str) {
				return str.replace(/^\s*/, '').replace(/\s*$/, '');
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
				if (!isDef(searchData)) {
					return null;
				}
				//console.log(searchData);
				var searchObj = {
					"hasFilters" : false,
					"hasDisjunctions" : true,
				};

				//Exact Matching
				var exactPattern = /\"([^\"]*)\"/g;
				var exactMatch;
				var exact_clauses = [];
				while (exactMatch = exactPattern.exec(searchData)) {
					var m = exactMatch[1];
					exact_clauses.push(m);					
				}
				for (var i in exact_clauses) {
					var clause = exact_clauses[i];
					searchData = trimString(searchData.replace('"' + clause + '"', ''));
				}
				
				
				//Tag Matching
				var tagPattern = /\[([^\]]*)\]/g;
				var tagMatch;
				var tag_clauses = [];
				while (tagMatch = tagPattern.exec(searchData)) {
					var m = tagMatch[1];
					tag_clauses.push(m);
				}
				for (var i in tag_clauses) {
					var clause = tag_clauses[i];
					searchData = trimString(searchData.replace('[' + clause + ']', ''));
				}	
			
				// See commented our code block at bottom
				
				var andCheck = searchData.split(" ");
				for (var i in andCheck) {
					var clause = andCheck[i];
					if (clause == "AND") {
						searchData = trimString(searchData.replace("AND", ''));
						searchObj.hasFilters = true;
						searchObj.hasDisjunctions = false;
					}
				}
				
				var arr = [];
				if (searchObj.hasFilters) {
					searchObj.filters = [];
					arr = searchObj.filters;
				} else {
					searchObj.disjunctions = [];
					arr = searchObj.disjunctions;
				}
				var clauses = [];
				if (searchData.length > 0) {
					var clauses = searchData.split(" ");
				}
				var terms = clauses.concat(exact_clauses);
				for (var i in terms) {
					var clause = terms[i];
					arr.push({
						"name" : "topic",
						"op" : "like",
						"val" : "%" + clause + "%"
					});	

					arr.push({
						"name" : "body",
						"op" : "like",
						"val" : "%" + clause + "%"
					});	
				}
				for (var i in tag_clauses) {
					var clause = tag_clauses[i];
					arr.push({
						"name" : "tags__name",
						"op" : "any",
						"val" : clause
					});
				}	
				console.log(arr);
			
				console.log(searchObj);	
				return searchObj;
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
			}, function(err) {				
				if (err.status === 401) {
					console.log(err);
					whatUp.loginRedirect(err.data.url);
				}
			});
		}
		
		/*
		var sub1 = new Subscriptions({
					tags: [
							{
								name:"api"
							}
						]
					});
		sub1.$create(function(resp){ console.log(resp); }, function(err){ console.log(err); });
		*/
		$scope.search();

		$scope.htmlFromMarkdown = function(markdown) {
			return converter.makeHtml(markdown);
		};

		$scope.timeAgo = function(created_at) {
			//mark it with UTC time
			created_at += "Z";
			return $.timeago(created_at);
		};

		$scope.md5 = function(word) { 
			console.log(word);
			return md5(word.toLowerCase().trim()); 
		};
}

// define injections
PostsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'EventBus', 'Posts', 'Subscribed'];