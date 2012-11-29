AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"posts" : "posts",
		"posts/:page_id":"posts",
		"post/add":"post_add",
		"post/:id":"post"
	},

	initialize : function(){		
		this.postsModel = new Posts();		
		this.postsView = new PostsView({model: this.postsModel});
		this.paginationModel = new PaginationModel();
		this.paginationView = new PaginationView({model: this.paginationModel});
		this.newPostView = new NewPostView();		
	},

	posts:function(page_id){
		console.log("posts(" + page_id + ") called.");	
		console.log("page_id: " + page_id);

		if (typeof page_id === 'undefined') {
			page_id = 1;
		}

		this.postsModel.fetch({data : { page : page_id }});
		this.paginationModel.fetch({data : {page : page_id}});

		this.newPostView.render();
		$(this.newPostView.el).show();
		$('.wrapper').html(this.postsView.render().el);

		// begin watching for new posts continuously
		// this requires postsModel to have a reference to
		// paginationModel so it can re-fetch the appropriate
		// page
		this.postsModel.setPaginationModel(this.paginationModel);
		this.postsModel.beginWatch();
		
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
		$(this.paginationView.el).hide();
	},

	post_add:function(){
		console.log("post_add() called.");	
		$(this.newPostView.el).hide();
		$(this.paginationView.el).hide();
		this.formView = new FormView({model: this.postsModel}).render();
	}
});


var app = new AppRouter();
Backbone.forceContentTypeApplication = true;
Backbone.history.start();