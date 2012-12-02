PostView = Backbone.View.extend({
	template: _.template($('#tpl-post').html()),	
	listItemTemplate: _.template($('#tpl-post-list-item').html()),	
	deleteAlertTemplate: _.template($('#tpl-post-delete-alert').html()),

	events : {
		"hover .post-tag" : "tagHover",
		"click .post-action-delete" : "postDelete",
		"click .post-action-edit"	: "editRedirect",
		"click .post-delete-confirm" : "postDeleteConfirmed"
	},

	/*
		Used to render a single post view when vieweing
		individual posts at theur URLs
	*/
	render:function(event_){
		console.log('rendering post');		
		$(this.el).html(this.template(this.model.toJSON()));

		// add users to dropdown
		console.log(this.options.users);
		return this;
	},

	/*
		User to render a post list item when viewing a collection of posts
	*/
	renderListItem : function(event_) {
		console.log('rendering post list item');
		$(this.el).html(this.listItemTemplate(this.model.toJSON()));
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

	},

	postDelete : function(e) {
		console.log('called postDelete()');
		console.log(this.model.toJSON());

		/*
			Show alert to user to confirm he really does want to delete the post
		*/
		var that = this;

		$(this.el).prepend(this.deleteAlertTemplate({
			header : "",
			body : "Are you sure you want to delete the post: '" + this.model.get("topic") + "' ?"
		}));
		$(".post-delete-alert")	.alert()	// show the alert (doesn't actually show it since it is set to display:none )
					.bind('close', function(e){ that.postDeleteAlertClose(e); })
					.slideDown(400);		// show the alert
	},

	postDeleteAlertClose : function(e) {
		e.preventDefault();	// prevent the default closing action
		
		$(e.target).slideUp(400, function() {	// do the slideUp animation
			$(e.target).remove();	// when animation completed, delete the alert box
		});
	},

	postDeleteConfirmed : function(e) {
		// user has confirmed deletion request
		
		// prevent default 
		e.preventDefault();

		// hide delete confirmation alert
		var alert = {
			preventDefault : function(){},
			target : $(".post-delete-alert")
		};

		this.postDeleteAlertClose(alert);

		// show deletion modal
		this.showProgressDialog();

		// issue the deletion request
		this.model.destroy({
			wait : true,	// wait for server to confirm before deleting from collection
			success : function(model, response) {
				$('.modal-body p').html('Post deleted successfully! <br /> Redirecting...');
				$('.modal-body img').attr('src', 'assets/img/loaders/check.png');

				// redirect to home page
				setTimeout(function(){
					window.location = "/";
				}, 1000);
			}
		});
	},

	showProgressDialog : function() {
		// show the progress dialog
		var template = _.template($('#tpl-post-working').html());
		this.$el.append(template({
			header : 'Project WhatUp',
			body : "Deleting '" + this.model.get("topic") + "'",
			image : 'working.gif'
		}));
		$('#working-dialog').modal();
	},

	editRedirect : function(e) { 		
		e.preventDefault();
		var editUrl = "#/post/edit/" + this.model.get("id");
		window.location = editUrl;
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
		$(this.el).append(new PostView({model:post}).renderListItem().el)		
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