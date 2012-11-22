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
	},

	render: function(event_){	
		$(this.el).empty();	
		_.each(this.model.models, function(post){			
			this.renderPost(post);
		}, this);
		this.timeago();
		return this;	
	},

	renderPost : function(post) {
		$(this.el).append(new PostView({model:post}).render().el)		
	},

	timeago : function(){
		$('.timeago').timeago();
	},

	events : {		
		"click #post_add_submit" : "createPost",		
	},

	createPost : function(e){
		console.log('creating post');
		// not necessarry since 'button' element has no default action
		// leaving it here anyways incase at some point we change it to an anchor element
		e.preventDefault();
		
		// values of the object should be read in from a form
		var newPostData = {
			topic : $('#post_title').val(),	
			body : $('#post_content').val(),			
			user_id : 1,
		};	
		
		var newPostModel = new Post(newPostData);
		var postCreationStatus = this.model.create(newPostModel, {
			wait : true 	// waits for server to respond with 200 before adding newly created model to collection
		});

		if (postCreationStatus !== false) {
			// API responded with 200 OK			
			//newPostModel.attributes.created_at = (new Date()).toISOString();
			//this.renderPost(newPostModel);
			//this.timeago();
			
			window.location = "/";
		} else {	
			// api did not respond with 200 OK
			console.log('new post creation failed');
		}		
	},

	refetch : function(){		
		console.log('refetching');
		app.posts.models = [];
		console.log(app.posts.models);
		app.posts.fetch();
	}
});