PostView = Backbone.View.extend({
	template:_.template($('#tpl-post').html()),	
	className: 'post',

	events : {
		"hover .post-tag" : "tagHover"
	},

	render:function(event_){
		console.log('rendering post');		
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	},

	tagHover : function(e) {
		// once we stop using placeholder tags, this
		// logic will need to be changed to get tag information

		var $target = $(e.target);
		var summary = $target.data('content');

		// fetch tag summary from API only if it hasn't been fetched already
		if (!summary) {
			$target.data('content', "You are hovering over " + $target.text() + ". This space will be used to show a summary of the tag." );			
		}

		// var popoverOptions = {
		// 	animation : true,
		// 	html : true,
		// 	placement : 'top',
		// 	trigger : 'hover',
		// 	title : "<strong>" + $target.text() + "</strong>",
		// 	content : "You are hovering over " + $target.text() + ". This space will be used to show a summary of the tag." 
		// };

		// // create pop-over
		// $target.popover(popoverOptions);

		//toggle visibility
		$target.popover('toggle');

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
		console.log(this.model.get("totalPages"));

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

		
		for(var page = 1; page <= this.model.get("totalPages"); page++) {

			if(page == this.model.get("currentPage")) {				
				$(this.innerEl).append(this.pagCur({
					btnTitle : 'Page ' + page,
					btnText : page
				}));
			} else {					
				// use template to generate page number buttons
				$(this.innerEl).append(this.pagBtn({
					btnClass: "btn-small",
					btnHref: "/#posts/" + page,
					btnTitle : 'Page ' + page,
					btnText : page
				}));
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