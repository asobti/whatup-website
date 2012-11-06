PostView = Backbone.View.extend({
	template:_.template($('#tpl-post').html()),

	render:function(event_){
		console.log("Post rendering~" + this.model.topic);
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}
});

PostsView = Backbone.View.extend({
	tagName:"div",

	initialize:function(){
		this.model.bind("reset", this.render, this);
	},

	render:function(event_){
		_.each(this.model.models, function(post){
			console.log("Posts rendering~" + post);
			$(this.el).append(new PostView({model:post}).render().el)
		}, this);
		return this;
	}

});


