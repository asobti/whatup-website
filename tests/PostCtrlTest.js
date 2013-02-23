describe("Post Controller", function($scope, $http, $routeParams, Posts, Users) {
    
	it("creates new post", function() {
		expect($scope.post).not.toEqual(null);
    });
	
	it("Fetch users", function(data) {
		expect($scope.users).toBe(data.objects);
    });
	
	it("Submit post", function(){
		expect($scope.submit).toBe(createPost());
	});
	
	it("Cancel post", function(){
		expect($scope.cancel).toBe(post.body);
	});
	
	it("Saves post", function(post){
		expect($scope.modal.body).toMatch('Post edited successfully. Redirecting...');
		expect($scope.modal.image).toMatch('assets/img/loaders/check.png');
	});
	
	it("Deletes post", function(){
		expect($scope.modal.body).toMatch('Post deleted successfully. Redirecting...');
		expect($scope.modal.image).toMatch('assets/img/loaders/check.png');
	});
	
	it("Processes dialogue", function(msg){
		expect($scope.modal.header).toMatch("Project WhatUp");
		expect($scope.modal.body).toBe(msg);
		expect($scope.modal.image).toMatch('assets/img/loaders/working.gif');
	});
});