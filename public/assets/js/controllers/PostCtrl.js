'use strict';

function PostCtrl($scope, $http, $routeParams, Posts) {

	$scope.tags = '';

	if (typeof $routeParams.postId === 'undefined') {		
		$scope.post = new Posts({
			topic : '',
			body : '',
			user_id : '',
			tags : []
		});
	} else {
		$scope.post = Posts.get({'postId' : $routeParams.postId}, function() {
			$scope.tags = getTagsAsString();
		});

	}

	// fetch users
	var usersUrl = whatUp.apiRoot + 'users';
	
	$http.get(usersUrl).success(function(users) {
		$scope.users = users.objects;			
	});

	// submit the post to save it
	$scope.submit = function() {
		//processTags();
		
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
			$scope.modal.body = 'Post edited successfully. Redirecting...';
			$scope.modal.image = 'assets/img/loaders/check.png';

			// redirect to homepage
			setTimeout(function() { 
				redirectHomepage(); 
			}, 1000);
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

	$scope.tagFinished = function() {
		$scope.currentTag = $.trim($scope.currentTag);

		if ($scope.currentTag === '') return;
		
		if (angular.pluckIndex($scope.post.tags, 'name', $scope.currentTag) === -1) {
			$scope.post.tags.push({
				name : $scope.currentTag
			});
		}
		
		$scope.currentTag = '';	
		console.log('tag finished');	
	};

	$scope.removeTag = function(tagName) {
		var index = angular.pluckIndex($scope.post.tags, 'name', tagName);

		if (index !== -1) {
			$scope.post.tags.splice(index, 1);
		}
	};

	var getTagsAsString = function() {
		var tagString = '';

		if (typeof $scope.post.tags === 'undefined') {
			return '';
		}

		$.each($scope.post.tags, function(index, tag) {
			tagString += tag.name + " ";
		});

		return tagString;
	};

	var processTags = function() {
		var tags = $scope.tags.split(' ');
		
		 $scope.post.tags = [];

		$.each(tags, function(index, tag) {
			tag = $.trim(tag);
			if (tag === '') return;						
			
			$scope.post.tags.push({
				"name" : tag
			});
			
		});		
	};

	/*
		TODO - Run validation on post inputs
	*/
	var validatePost = function(post) {
		// validate models
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