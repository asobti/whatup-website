'use strict';

function PostCtrl($scope, $http) {
	var original = {};
	$scope.foobar = "foo";
	// fetch users
	var usersUrl = whatUp.apiRoot + 'users';
	$http.get(usersUrl).success(function(users) {
		$scope.users = users.objects;		
	});

	// submit the post to save it
	$scope.submit = function() {
		
		var post = getPost();

		if($.isEmptyObject(original)) {
			console.log('creating new post');
			createPost(post);
		} else {
			console.log('editing post');
			savePost();
		}
	};

	$scope.cancel = function() {
		if ($.isEmptyObject(getPost())) {
			redirectHomepage();
		} else {
			if (confirm("Are you sure you want to discard this post?")) {
				redirectHomepage();
			}
		}
	};

	var getPost = function() {		
		var post = {
			topic : $scope.topic,
			body : $scope.body,
			user_id : parseInt($scope.user_id, 10),
			tags : []
		};
		
		if (!post.topic && !post.body) {
			return {};
		} else {
			return post;
		}
	};

	var createPost = function(post) {
		showProgressDialog();		
		
		$http({
			method : 'POST',
			data : JSON.stringify(post),
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

	var savePost = function(post) {
		if (original == post) {
			console.log('no changes made');
			return;
		}

		// code to make http put request
	};

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

PostCtrl.$inject = ['$scope', '$http'];