FormView = Backbone.View.extend({
	template:_.template($('#tpl-new-post-form').html()),
	el: ".wrapper",

	render : function(){
		console.log('rendering form');
		$(this.el).html(this.template());
	},

	events : {
		"click #post_add_cancel" : "cancelPost",
		"click #post_add_submit" : "createPost",		
	},

	createPost : function(e){
		// show progress dialog
		this.showProgressDialog();
		
		console.log("createPost() called.");
		// not necessarry since 'button' element has no default action
		// leaving it here anyways incase at some point we change it to an anchor element
		e.preventDefault();
		
		// values of the object should be read in from a form
		var newPostData = {
			topic : $('#post_title').val(),	
			body : $('#post_content').val(),			
			user_id : 1,
		};

		console.log(newPostData);	
		var newPostModel = new Post(newPostData);

		// store this for use in the callback
		var that = this;

		var postCreationStatus = this.model.create(newPostModel, {
			wait : true, 	// waits for server to respond with 200 before adding newly created model to collection

			success : function(resp){
				console.log('success callback');
				console.log(resp);

				$('.modal-body p').html('Post added successfully! <br /> Redirecting...');
				$('.modal-body img').attr('src', 'assets/img/loaders/check.png');

				setTimeout(function(){
					that.redirectHomePage();	
				}, 1000);
				
			},

			error : function(err) {
				console.log('error callback');
				that.hideProgressDialog();
				// this error message for dev only
				alert('There was an error. See console for details');
				console.log(err);
			}
		});

		console.log(postCreationStatus);

		if (postCreationStatus === false) {			
			// validation failed
			console.log('new post creation failed');
		}
	},

	cancelPost : function(e) {
		console.log("cancelPost() called.");
		var contents = $('textarea').val();	
		console.log(contents);
		if (contents) {
			if (confirm("Are you sure you want to discard this post")) {
				this.redirectHomePage();
			}			
		} else {
			this.redirectHomePage();			
		}		
	},

	redirectHomePage : function() {
		window.location = "/";
	},

	showProgressDialog : function() {
		// show the progress dialog
		var template = _.template($('#tpl-post-working').html());
		this.$el.append(template({
			header : 'Project WhatUp',
			body : 'Adding your post...',
			image : 'working.gif'
		}));
		$('#working-dialog').modal();
	},

	hideProgressDialog : function() {
		// hide the progress dialog		
		$('#working-dialog').modal('close');	
	}
});