'use strict';

describe("WhatUp Controllers", function(){

	beforeEach(function(){
		this.addMatchers({
		  toEqualData: function(expected) {
			return angular.equals(this.actual, expected);
		  }
		});
	});
  
	beforeEach(module('WhatUpServices'));
	
	describe("PostsCtrl", function() {
		
		var scope, ctrl, $httpBackend;
		var converter;
		
		beforeEach(inject(function($scope, $http, $location, $routeParams, eventBus, Posts, Subscribed) {
		  $httpBackend = _$httpBackend_;
		  
		 // $routeParams = {postID: 'undefined'};
		  scope = $Scope.$new();
		  scope.mode = "recent";
		  ctrl = $controller(PostsCtrl, {$scope: scope});
		  var urlSearchParam = $location.search().q;
		  var newSearchObjFromURL = { q: $scope.searchData };
		 // convertor = new Attacklab.showdown.converter();
		}));
	
	
		it("Checks for subscriptions", function() {
				console.log("Logfile");
				expect(scope.mode).toBe("subscribed");
				expect(scope.posts).toEqualData(data.objects);
				expect(paginationObj.currentPage).toBe(data.page);
				expect(paginationObj.totalPages).toEqual(data.total_pages);
			});
		
		it("Fetch users", function() {
				console.log("Logfile");
				expect(scope.users).toBe(data.objects);
		});
	});
	
	//need to add more
});
