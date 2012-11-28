PostView = Backbone.View.extend({
	template:_.template($('#tpl-post').html()),	
	className: 'post',

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

/*
	The view that handles and renders the pagination buttons
	and the bottom of posts view. 
	PaginationView is located in this file because it will 
	always be used only in conjunction with PostsView.
*/
PaginationView = Backbone.View.extend({
	template:_.template($('#tpl-pagination').html()),

	// inline template for pagination buttons (links)
	pagBtn: _.template('<a class="btn btn-info btn-small <%= btnClass %>" href="<%= btnHref %>" title="<%= btnTitle %>" > <%= btnText %> </a>'),
	// inline template for pagination span for current page
	pagCur: _.template('<span class="current_page btn btn-info btn-small disabled" title="<%= btnTitle %>"> <%= btnText %> </span>'),
	

	el: "#pagination_container",
	innerEl: ".pagination",

	events : {
		'click a' : 'scrollTop'
	},

	initialize : function() {
		console.log("paginiation init() called.");
		this.model.on("change", this.render, this);
	},

	render: function(event_) {
		console.log("pagination render() called.");
		this.$el.html(this.template());
		console.log('pagination model:');
		console.log(this.model.hasNext());

		var prevClass = "prev";
		var prevHref = '/#posts/' + this.model.prevPage();

		if(!this.model.hasPrev()) { //do we have previous		
			prevClass += " disabled";			
			prevHref = "javascript:void()";
		}

		// use pagBtn template to generate previous button		
		$(this.innerEl).append(this.pagBtn({
			btnClass: prevClass,
			btnHref: prevHref,
			btnTitle : 'Previous page',
			btnText : '&larr;'
		}));

		if(this.model.get("totalPages") > 2) {		
			for(var i = 1; i <= this.model.get("totalPages"); i++) {			
				if(i == this.model.get("currentPage")) {									
					//$(this.innerEl).append('<span class="current_page btn btn-info btn-small disabled">' + i + '</span>');
					$(this.innerEl).append(this.pagCur({
						btnTitle : 'Page ' + i,
						btnText : i
					}));
				} else {					
					// use template to generate page number buttons
					$(this.innerEl).append(this.pagBtn({
						btnClass: "btn-small",
						btnHref: "/#posts/" + i,
						btnTitle : 'Page ' + i,
						btnText : i
					}));
				}
			}
		}

		var nextClass = "next";
		var nextHref = '/#posts/' + this.model.nextPage();

		if(!this.model.hasNext()) { //do we have next
			nextClass += " disabled";			
			nextHref = "javascript:void()";
		}
		
		$(this.innerEl).append(this.pagBtn({
			btnClass: nextClass,
			btnHref: nextHref,
			btnTitle : 'Next page',
			btnText : '&rarr;'
		}));
	},

	scrollTop : function(e) {
		// only scroll top if the event target is not disabled		
		if (!($(e.target).hasClass('disabled'))) {
		 	$("document, html, body").animate({ 
		 								scrollTop: 0 
		 							}, 700);	
		}		
	}
});