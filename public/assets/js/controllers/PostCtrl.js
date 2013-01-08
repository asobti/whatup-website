'use strict';

function PostCtrl($scope, $http, $routeParams, Posts) {

	if (typeof $routeParams.postId === 'undefined') {
		$scope.post = new Posts({
					topic : '',
					body : '',
					user_id : '',
					tags : []
				});		
	} else {
		$scope.post = Posts.get({'postId' : $routeParams.postId});
		console.log($scope.post);
	}

	// fetch users
	var usersUrl = whatUp.apiRoot + 'users';
	var that = this;

	$http.get(usersUrl).success(function(users) {
		$scope.users = users.objects;			
	});

	// submit the post to save it
	$scope.submit = function() {
		if(typeof $scope.post.id === 'undefined') {
			console.log('creating new post');
			createPost();
		} else {
			console.log('editing post');
			savePost();
		}
	};

	$scope.cancel = function() {		
		if (confirm("Are you sure you want to discard this post?")) {
			redirectHomepage();
		}		
	};

	/*
		TODO : Replace $http with custom REST service
	*/
	var createPost = function() {
		showProgressDialog("Adding your post...");		
		
		$scope.post.$create(function(resp){
			$scope.modal.body = 'Post added successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { redirectHomepage(); }, 1000);
		}, function(err){
			alert('Error. See console for details');
			console.log(err);
		});
	};

	/*
		TODO - Complete
	*/
	var savePost = function(post) {
		//console.log($scope.post);
		showProgressDialog("Editing your post...");

		$scope.post.$save(function(resp) {
			$scope.modal.body = 'Post added successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { redirectHomepage(); }, 1000);
		}, function(err) {
			alert('Error. See console for details');
			console.log(err);
		});		
	};

	/*
		TODO - Complete
	*/
	$scope.deletePost = function() {
		if (confirm("Are you sure you want to delete this post?")) {
			
			showProgressDialog("Deleting post...");
				$scope.modal.body = 'Post deleted successfully. Redirecting...';
				$scope.modal.image = 'assets/img/loaders/check.png';

				// redirect to homepage
				setTimeout(function() { redirectHomepage(); }, 1000);
			$scope.post.$delete(function(resp) {
				console.log(resp);
			}, function(err) {
				alert('Error. See console for details');
				console.log(err);
			});	
		}	
	};

	/*
		TODO - Run validation on post inputs
	*/
	var validatePost = function(post) {

	};

	var showProgressDialog = function(msg) {
		$scope.modal = {
			header : "Project WhatUp",
			body : msg,
			image : 'assets/img/loaders/working.gif'
		};

		$('#working-dialog').modal();
	};

	var redirectHomepage = function() {
		window.location = "/";
	};


}

PostCtrl.$inject = ['$scope', '$http', '$routeParams', 'Posts'];