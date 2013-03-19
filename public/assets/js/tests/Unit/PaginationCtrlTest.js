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
	
	describe("PaginationCtrl", function() {
		
		var scope, ctrl;
		var converter;
		
		beforeEach(inject(function($rootScope, eventBus) {
		  
		  scope = $rootScope.$new();
		  scope.currentPage = 0;
		  scope.totalPages = 0;
		  scope.pages = [];
		  ctrl = $controller(PaginationCtrl, {$scope: scope});
		 // convertor = new Attacklab.showdown.converter();
		}));
		
		it("Checks for previous page", function() {
			console.log("Logfile");
			expect(scope.hasPreviousPage).toBe($scope.currentPage > 1);
		});
		
		it("Checks for next page", function() {
			console.log("Logfile");
			expect(scope.hasNextPage).toBe($scope.currentPage < $scope.totalPages);
		});
		
		it("Gets the link for the previous page", function() {
			console.log("Logfile");
			scope.hasPreviousPage = true;
			expect(scope.getPrevPageLink).toBe('#/posts/' + ($scope.currentPage + 1));
		});
		
		it("Gets the link for the previous page", function() {
			console.log("Logfile");
			scope.hasPreviousPage = false;
			expect(scope.getPrevPageLink).toBe('javascript:void()');
		});
		
		it("Gets the link for the next page", function() {
			console.log("Logfile");
			scope.hasNextPage = true;
			expect(scope.getNextPageLink).toBe('#/posts/' + ($scope.currentPage + 1));
		});
		
		it("Gets the link for the next page", function() {
			console.log("Logfile");
			scope.hasNextPage = false;
			expect(scope.getNextPageLink).toBe('javascript:void()');
		});
		
		//need to add more stuff
	});
});