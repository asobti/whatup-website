 var Post = Backbone.Model.extend({	
	//urlRoot: "http://projectwhatup.us:5000/api/posts",	
	url: function() {
		if (typeof this.id === 'undefined') {
			return 'http://projectwhatup.us:5000/api/posts';	
		} else {
			return 'http://projectwhatup.us:5000/api/posts/' + this.id;	
		}    	
  	},

	initialize : function(){			
		//this.on("error", this.error, this);	
	},

	validate : function(attrs){
		console.log('validating');
		console.log(attrs);
		if (!(attrs.topic || attrs.body)) {
			console.log('validation failed');
			return "You must enter a topic and a body";
			console.log('validation failed1');
		}
	},

	error : function(model, err){
		console.log('error event');
		alert(err);
	}

	
});

Posts = Backbone.Collection.extend({
	model: Post,
	url: 'http://projectwhatup.us:5000/api/posts?q={"order_by":[{"field":"created_at","direction":"desc"}]}',

	parse: function(data) {
		return data.objects;
	},

	setPaginationModel : function(pag) {
		this.paginationModel = pag;
	},

	beginWatch : function() {
		if (typeof this.paginationModel === 'undefined') {
			// if pagination model hasn't been set, we're unable to refetch
			// fail silently since this is not a fatal error
			console.log('paginationModel undefined in Posts collection. Unable to watch API.');
			return;
		}

		// store reference of this for use within setInterval
		var that = this;
		
		setInterval(function() {
			that.refetch();
		}, 5000);
	},

	refetch : function() {
		var page_num = this.paginationModel.get("currentPage");

		// (Ayush) Only refetch if user is on first page. This is because if user is on second page, and
		// a new post is added, it will be added to the first page, and the user will see the last
		// post on the first page now on the second page. I don't think there's much utility to this
		// but I'm open to discuss it

		if (page_num === 1) {
			console.log("refetching page 1");
			this.fetch({ data : { page : page_num }});
		}
	}
});

/*
	Model that holds all data regarding pagination
	The model is located in this file because it is
	tightly coupled with the Post model and Posts
	collection and will never be used by itself.
*/
PaginationModel = Backbone.Model.extend({
	url: "http://projectwhatup.us:5000/api/posts",	

	parse:function(data) {
		var pageObj = {
			totalPages : data.total_pages,
			currentPage : data.page
		};

		return pageObj;
	},

	initialize : function() {
		console.log("paginationModel init() called.");
	},

	hasPrev : function() {
		return (this.get("currentPage") > 1);
	},

	hasNext : function() {
		return (this.get("currentPage") < this.get("totalPages"));
	},

	prevPage : function() {
		if(this.hasPrev()) {
			return this.get("currentPage") - 1;
		}

		return null;
	},

	nextPage : function() {
		if(this.hasNext()) {
			return this.get("currentPage") + 1;
		}

		return null;
	},

	changeCurrentPage : function(page) {
		this.currentPage = page;
	}
});
