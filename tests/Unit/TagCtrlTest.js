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
	
	describe("TagCtrl", function() {
		
		var scope, ctrl, $httpBackend;
		var converter;
		
		beforeEach(inject(function($rootScope, _$httpBackend_, $routeParams, Tags) {
			$httpBackend = _$httpBackend_;
		  
			$routeParams = {tagID:};
			scope = $rootScope.$new();
			scope.tag = [];
			ctrl = $controller(TagCtrl, {$scope: scope});
		 // convertor = new Attacklab.showdown.converter();
		}));
	
		it("Tag Controller Test", function(){
			expect(scope.tag).toBe();
			//http	
			expect(scope.tag).toBe(Tags.get({tagId : $routeParams.tagId}));
		});

	});
});