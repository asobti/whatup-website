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
		var postCreationStatus = this.model.create(newPostModel, {
			wait : true 	// waits for server to respond with 200 before adding newly created model to collection
		});

		console.log(postCreationStatus);

		if (postCreationStatus !== false) {			
			console.log("REDIRECTING");
			this.redirectHomePage();
		} else {	
			// api did not respond with 200 OK
			console.log('new post creation failed');
		}		
	},

	cancelPost : function(e){
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

	redirectHomePage : function(){
		window.location = "/";
	}
});