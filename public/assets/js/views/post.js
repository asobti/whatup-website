PostView = Backbone.View.extend({
	template:_.template($('#tpl-post').html()),	

	render:function(event_){
		console.log('rendering post');		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

PostsView = Backbone.View.extend({
	tagName:"div",
	el : ".posts",
	
	initialize : function(){
		this.model.on("reset", this.render, this);		
		console.log('init posts view');		
	},

	render: function(event_){
		console.log('rendering posts');	
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

	refetch : function(){		
		console.log('refetching');
		app.posts.models = [];
		console.log(app.posts.models);
		app.posts.fetch();
	}
});