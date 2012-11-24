AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"posts/:page_id":"posts",
		"post/add":"post_add",
		"post/:id":"post"
	},

	initialize : function(){		
		this.postsModel = new Posts();		
		this.postsView = new PostsView({model: this.postsModel});
		this.newPostView = new NewPostView();		
	},

	posts:function(page_id){
		console.log("posts(" + page_id + ") called.");	
		this.postsModel.fetch();
		this.newPostView.render();
		$(this.newPostView.el).show();
		$('.wrapper').html(this.postsView.render().el);
	},
	
	post:function(id){
		console.log("post("+id+") called.");	
		
		this.post = new Post();		
		this.post.id = id;
		this.post.fetch({			
			success : function(model, response, options) {
				console.log('success callback');
				console.log(model);
				this.postView = new PostView({"model" : model});				
				$('.wrapper').html(this.postView.render().el);
			},
			error : function(model, xhr, options) {
				console.log('error');
				console.log(xhr);
			}
		});
		
		this.newPostView.render();
		$(this.newPostView.el).show();		
	},

	post_add:function(){
		console.log("post_add() called.");	
		$(this.newPostView.el).hide();
		this.formView = new FormView({model: this.postsModel}).render();
	}
});


var app = new AppRouter();
Backbone.forceContentTypeApplication = true;
Backbone.history.start();