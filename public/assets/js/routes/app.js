AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"post/:id":"post"
	},
	
	posts:function(){
		console.log("posts route");
		this.posts = new Posts();
		this.posts.fetch();
		this.postsView = new PostsView({model:this.posts});		
		$('#posts').html(this.postsView.render().el);
	},
	
	post:function(id){
		console.log("post route");
		this.post = new Post(id);
		this.postView = new PostView({model:this.post});
		this.post.fetch();
		$('#posts').html(this.postView.render().el);
	}
});

var app = new AppRouter();
Backbone.history.start();
