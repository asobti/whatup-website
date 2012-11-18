console.log('posts view loaded');

PostView = Backbone.View.extend({
	//template:_.template($('#tpl-post').html()),

	render:function(event_){		
		//$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

PostsView = Backbone.View.extend({
	tagName:"div",

	initialize : function(){
		this.model.bind("reset", this.render, this);
		console.log('posts view');
	},

	render:function(event_){
		_.each(this.model.models, function(post){			
			$(this.el).append(new PostView({model:post}).render().el)
		}, this);
		return this;
	}
});