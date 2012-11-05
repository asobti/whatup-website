AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"post/:id":"post"
	},
	
	posts:function(){
		this.posts = new Posts();
		this.postsView = new PostsView({model:this.posts});
		this.posts.fetch();
		$('#posts').html(this.postsView.render().el);
	},
	
	post:function(id){
		this.post = new Post(id);
		this.postView = new PostView({model:this.post});
		$('#posts').html(this.postView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();
