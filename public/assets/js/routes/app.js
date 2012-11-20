
$('#new_post_btn').click(function(){
	window.location = "#post/add";
});

var MyViews = [];

MyViews.push($('#posts'));
MyViews.push($('#posts_add'));

function hideViews()
{
	for(var i =0; i < MyViews.length; i++)
	{
		MyViews[i].hide();
	}
}





AppRouter = Backbone.Router.extend({
	routes:{
		"":"posts",
		"post/add":"post_add",
		"post/:id":"post"
	},
	
	cleanviews:function(){
		hideViews();
	},
	
	posts:function(){
		this.cleanviews();
		console.log("posts route");
		this.posts = new Posts();
		this.posts.fetch();
		this.postsView = new PostsView({model:this.posts});		
		$('#posts').html(this.postsView.render().el);
	},
	
	post:function(id){
		this.cleanviews();
		console.log("post route");
		this.post = new Post(id);
		this.postView = new PostView({model:this.post});
		this.post.fetch();
		$('#posts').html(this.postView.render().el);
	},
	post_add:function(){
		this.cleanviews();
		console.log("post add");
		$('#posts').hide();
		$('#post_add').show();
		$('#post_add_cancel').click(function(){
			window.history.back();
		});	
	}
});



var app = new AppRouter();
Backbone.forceContentTypeApplication = true;
Backbone.history.start();
