AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"post/add":"post_add"
		//"post/:id":"post"
	},

	initialize : function(){		

	},

	posts:function(){
		console.log("posts route");	

		if (typeof this.fetchedPosts === 'undefined') {
			this.fetchedPosts = new Posts();
			this.fetchedPosts.fetch();	
		}
		
		if (typeof this.postsView === 'undefined') {
			console.log('is undefined');
			this.postsView = new PostsView({model: this.fetchedPosts});				
		}			

		console.log(this.postsView);

		if (typeof this.newPost === 'undefined') {
			this.newPost = new NewPostView();	
			this.newPost.render();
		} else {
			$(this.newPost.el).show();
		}
		
		$('#posts').html(this.postsView.render().el);
		
	},
	
	post:function(id){
		console.log("post route");
		this.post = new Post(id);
		this.postView = new PostView({model:this.post});
		this.post.fetch();
		this.newPost = new NewPostView();
		$('#posts').html(this.postView.render().el);
	},

	post_add:function(){

		if (typeof this.fetchedPosts === 'undefined') {
			this.fetchedPosts = new Posts();
			this.fetchedPosts.fetch();	
		}
		
		if (typeof this.postsView === 'undefined') {
			this.postsView = new PostsView({model: this.fetchedPosts});	
		}

		if (typeof this.newPost !== 'undefined') {
			console.log('here');
			$(this.newPost.el).hide();
		}

		this.formView = new FormView().render();
	}
});


var app = new AppRouter();
Backbone.forceContentTypeApplication = true;
Backbone.history.start();