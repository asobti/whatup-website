'use strict';

function PostCtrl($scope, $http, $routeParams, Posts, Users) {

	var converter = new Attacklab.showdown.converter();

	$scope.tags = '';
	
	$scope.fileUpload = {
		uploading : false,
		progress : 0
	};

	if (typeof $routeParams.postId === 'undefined') {		
		$scope.post = new Posts({
			topic : '',
			body : '',
			user_id : '',
			tags : [],
			attachments : []
		});
	} else {
		$scope.post = 	Posts.get({
							'postId' : $routeParams.postId
						}, function() {
							$scope.tags = getTagsAsString();
						}, function(err) {
							if (err.status === 401) {
								whatUp.loginRedirect(err.data.url);
							}
						});

		console.log($scope.post);
	}

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
		}		post.body
	};

	$scope.postBodyAsHtml = function() {
		return converter.makeHtml($scope.post.body);
	}

	$scope.uploadAttachment = function() {
		var form = $('form#attachment');	
		
		var elem = null;

		var attachment = null;

		// upload via ajax here
		form.ajaxSubmit({
			clearForm : true,
			dataType : 'json',
			type : 'POST',
			url : whatUp.apiRoot + 'upload',
			xhrFields : {
				withCredentials : true
			},
			beforeSubmit : function() {
				$scope.fileUpload.uploading = true;				
				$scope.$apply();
			},
			error : function(e) {
				alert('error. See console');
				console.log(e);
			},
			success : function(s) {				
				$scope.fileUpload.uploading = false;
				$scope.post.attachments.push(s);
				$scope.$apply();			
			},			
			uploadProgress : function(e, p, t, per) {
				$scope.fileUpload.progress = per;
				$scope.$apply();
			}
		});
	}

	$scope.deleteAttachment = function(id) {
		var idx = angular.pluckIndex($scope.post.attachments, 'id', id);
		console.log('deleteAttachment');
		console.log(idx);
		if (idx !== -1) {
			if (confirm ('Are you sure you want to delete ' + $scope.post.attachments[idx].name)) {
				$.ajax({
					url : whatUp.apiRoot + 'attachments/' + id,
					type : 'DELETE',
					xhrFields : {
						withCredentials: true
					},
					dataTye : 'json',
					success : function(s) {
						$scope.post.attachments.splice(idx, 1);
						$scope.$apply();
					}
				});
			}
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

PostCtrl.$inject = ['$scope', '$http', '$routeParams', 'Posts', "Users"];
