'use strict';

describe("WhatUp Controllers", function(){

	beforeEach(function(){		
		this.addMatchers({
		  toEqualData: function(expected) {
			return angular.equals(this.actual, expected);
		  },
		  toEqualResource : function(expected) {
		  	// compares an angular resource to a JS object
		  	// by converting the resource to an object.
		  	// Strips out functions and keeps properties

		  	var obj = {}

		  	for(var x in this.actual) {
		  		if (typeof this.actual[x] !== 'function') {
		  			obj[x] = this.actual[x];		  			
		  		}
		  	}
		  	console.log('obj');
		  	console.log(obj);
		  	return angular.equals(obj, expected);
		  }
		});
	});

	beforeEach(module('whatUpServices'));

	describe("PostCtrl", function() {
		var scope, ctrl, $httpBackend;
		var converter;
		var newPostData = function(){
			return {
					 topic : '',					 
					 body : '',
					 user_id : '',
					 tags : [],
					 attachments : [],
					 revisions : []
				 }				
		};		

		beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {			

			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('#/posts/').respond(newPostData());
			
			var $injector = angular.injector(['ng', 'ngResource']);
			var $resource = $injector.get('$resource');
			$routeParams = {};

			scope = $rootScope.$new();

			ctrl = $controller(PostCtrl, {
				$scope: scope,				
			});
			// convertor = new Attacklab.showdown.converter();
		}));

		it("Creates new post", function() {			
			expect(scope.post).toEqualResource(newPostData());			
		});		
	})

	it('test', function() {
		expect(1, 1);
	});
	
});


// it("Creates new post", function() {			
		// 	console.log("Logfile");
		// 	//$httpBackend.flush();
		// 	expect($routeParams.postID).toBe('undefined');
		// 	expect(scope.post).toEqualData(newPostData());		
		// });
		
		// it("Fetch users", function() {			
		// 	console.log("Logfile");
		// 	expect(scope.users).toBe(data.objects);
		// });
		
		// it("Submit post", function(){
		// 	console.log("Logfile");
		// 	expect(scope.post.id).tobeUndefined();
		// 	expect(scope.submit).toBe(createPost());
		// });
		
		// it("Cancel post", function(){
		// 	console.log("Logfile");
		// 	expect(scope.cancel).toBe(post.body);
		// });
		
		// it("posts post body as html", function(){
		// //	expect(scope.postBodyAsHtml).toBe(converter.makeHtml($scope.post.body));
		// });
		
		// it("Saves post", function(post){
		// 	expect(scope.modal.body).toMatch('Post edited successfully. Redirecting...');
		// 	//expect(scope.modal.image).toMatch('assets/img/loaders/check.png');
		// });
		
		// it("Deletes post", function(){
		// 	expect(scope.modal.body).toMatch('Post deleted successfully. Redirecting...');
		// 	//expect(scope.modal.image).toMatch('assets/img/loaders/check.png');
		// });
		
		// it("Processes dialogue", function(msg){
		// 	expect(scope.modal.header).toMatch("Project WhatUp");
		// 	expect(scope.modal.body).toBe(msg);
		// 	//expect(scope.modal.image).toMatch('assets/img/loaders/working.gif');
		// });