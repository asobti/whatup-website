'use strict';

function PostCtrl($scope, $http, $routeParams, Posts) {
	var postId = $routeParams.postId || -1;	

	if (postId === -1) {
		$scope.post = {
			topic : '',
			body : '',
			user_id : '',
			tags : []
		};
	} else {
		$scope.post = Posts.get({'postId' : postId});
		console.log($scope.post);		
	}	

	// fetch users
	var usersUrl = whatUp.apiRoot + 'users';
	
	$http.get(usersUrl).success(function(users) {
		$scope.users = users.objects;		
	});

	// submit the post to save it
	$scope.submit = function() {
		if(postId === -1) {
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
		showProgressDialog();		
		
		$http({
			method : 'POST',
			data : JSON.stringify($scope.post),
			url : whatUp.apiRoot + 'posts'
		})
		.success(function(resp) {
			console.log('Post created successfully');

			$scope.modal.body = 'Post added successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { redirectHomepage(); }, 1000);
		})
		.error(function(err) {
			console.log('Error creating post');
			console.log(err);
		});
	};

	/*
		TODO - Complete
	*/
	var savePost = function(post) {
		//console.log($scope.post);
		showProgressDialog();

		$scope.post.$save(function(resp) {
			$scope.modal.body = 'Post added successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { redirectHomepage(); }, 1000);
		}, function(err) {
			alert('Error. See console for details');
			console.log(err);
		});
		
		/*
		showProgressDialog();
		$http({
			method : 'PUT',
			data : JSON.stringify($scope.post),
			url : whatUp.apiRoot + 'posts/' + postId
		})
		.success(function(resp) {
			console.log('Post created successfully');

			$scope.modal.body = 'Post added successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { redirectHomepage(); }, 1000);
		})
		.error(function(err) {
			console.log('Error creating post');
			console.log(err);
		});
		*/
	};

	/*
		TODO - Complete
	*/
	var deletePost = function() {

	};

	/*
		TODO - Run validation on post inputs
	*/
	var validatePost = function(post) {

	};

	var showProgressDialog = function() {
		$scope.modal = {
			header : "Project WhatUp",
			body : "Adding your post...",
			image : 'assets/img/loaders/working.gif'
		};

		$('#working-dialog').modal();
	};

	var redirectHomepage = function() {
		window.location = "/";
	};


}

PostCtrl.$inject = ['$scope', '$http', '$routeParams', 'Posts'];