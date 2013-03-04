'use strict';

function PostsCtrl($scope, $http, $location, $routeParams, eventBus, Posts, Subscriptions) {
		$http.defaults.withCredentials = true;
		// console.log($http.defaults);
		$scope.fetchingPosts = true;
		var page = $routeParams.page || 1;

		var converter = new Attacklab.showdown.converter();

		$scope.showSubscriptions = function() {
			var subscriptions;
			Subscriptions.query({}, function(data) { 
				subscriptions = data.objects;
			});
		}

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
				/*
				if (clauses.length > 0) {
					//use identical
					searchObj.disjunctions = [];
					for (var i in clauses) {
						var clause = clauses[i];
						searchObj.disjunctions.push(
							{
								"name" : "body",
								"op" : "like",
								"val" : "%" + clause + "%"
							});
						searchObj.disjunctions.push(
							{
								"name" : "topic",
								"op" : "like",
								"val" : "%" + clause + "%"
							});

					]*)
				}
				*/

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
				
	
			
				//console.log(searchData);
				/*
				//This gives us full control but the API can't handle it ;)
				var and_clauses = [];
				var or_clauses = searchData.split(" OR ");
				var moves = [];
				for (var i in or_clauses) {
					var clause = or_clauses[i];
					var sub_and_clauses = clause.split(" AND ");
					if (sub_and_clauses.length > 1) {
						var tmp_and_clauses = [];
						moves.push(i);
						for (var j in sub_and_clauses) {
							var sub_clause = sub_and_clauses[j];
							tmp_and_clauses.push(sub_clause);
						}
						and_clauses.push(tmp_and_clauses);
					}
					
				}
				for (var i in moves) {
					var shift = moves[i];
					or_clauses[shift] = and_clauses[i];
				}
				*/
				//console.log(clauses);
				
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
		Subscriptions.query({}, function(data){
				console.log(data);
			});

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
PostsCtrl.$inject = ['$scope', '$http', '$location', '$routeParams', 'EventBus', 'Posts', 'Subscriptions'];

