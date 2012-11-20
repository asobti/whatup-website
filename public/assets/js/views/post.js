console.log('posts view loaded');

PostView = Backbone.View.extend({
	template:_.template($('#tpl-post').html()),

	render:function(event_){		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

PostsView = Backbone.View.extend({
	tagName:"div",
	el : ".posts",
	
	initialize : function(){
		this.model.bind("reset", this.render, this);
		console.log('posts view');
		
		//this.model.on("add", this.render, this);
	},

	render:function(event_){
		_.each(this.model.models, function(post){			
			this.renderPost(post);
		}, this);

		return this;	
	},

	renderPost : function(post) {
		$(this.el).append(new PostView({model:post}).render().el)
	},

	events : {		
		"click #new_post" : "createPost"
	},

	createPost : function(e){
		// not necessarry since 'button' element has no default action
		// leaving it here anyways incase at some point we change it to an anchor element
		e.preventDefault();
		
		// values of the object should be read in from a form
		var newPostData = {
			topic : "New Post",	
			body : "new body",			
			user_id : 1,
		};	
		
		var postCreationStatus = this.model.create(new Post(newPostData), {
			wait : true 	// waits for server to respond with 200 before adding newly created model to collection
		});

		if (postCreationStatus !== false) {
			// API responded with 200 OK
			console.log('created new post');
			console.log(postCreationStatus);
		} else {	
			// api did not respond with 200 OK
			console.log('new post creation failed');
		}		
	},

	refetch : function(){		
		console.log('refetching');
		app.posts.fetch();
	}
});