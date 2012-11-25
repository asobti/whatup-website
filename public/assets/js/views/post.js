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

PaginationView = Backbone.View.extend({
	template:_.template($('#tpl-pagination').html()),
	el: "#pagination_container",
	innerEl: ".pagination",

	initialize : function() {
		console.log("paginiation init() called.");
		this.model.on("change", this.render, this);
	},

	render: function(event_) {
		console.log("pagination render() called.");
		$(this.el).html(this.template());
		console.log('pagination model:');
		console.log(this.model.hasNext());

		var prevClass = "prev btn btn-info";
		var prevHref = '/#posts/' + this.model.prevPage();

		if(!this.model.hasPrev()) { //do we have previous		
			prevClass += " disabled";			
			prevHref = "javascript:void()";
		}

		$(this.innerEl).append('<a class="' + prevClass + '" href="' + prevHref + '" title="Previous page">Prev</a>');

		if(this.model.get("totalPages") > 2) {		
			for(var i = 1; i <= this.model.get("totalPages"); i++) {			
				if(i == this.model.get("currentPage")) {				
					//placeholder
					$(this.innerEl).append('<span class="current_page btn btn-info btn-small disabled">' + i + '</span>');
				} else {
					$(this.innerEl).append('<a class="btn btn-info btn-small" href="/#posts/' + i + '">' + i + '</a>');
				}
			}
		}

		var nextClass = "next btn btn-info";
		var nextHref = '/#posts/' + this.model.nextPage();

		if(!this.model.hasNext()) { //do we have previous		
			nextClass += " disabled";			
			nextHref = "javascript:void()";
		}

		$(this.innerEl).append('<a class="' + nextClass + '" href="' + nextHref + '" title="Next page">Next</a>');
	}
});