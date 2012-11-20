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
		console.log('in createPost');
		e.preventDefault();
		
		var newPostData = {
			topic : "New Post",
			body : "new body",			
			user_id : 1,
		};	

		var newPostModel = new Post(newPostData);
		//newPostModel.save();
		this.model.create(newPostModel);

		console.log('created new post');		
	},

	refetch : function(){		
		console.log('refetching');
		app.posts.fetch();
	}
});