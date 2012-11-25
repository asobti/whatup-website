Post = Backbone.Model.extend({	
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
	url: "http://projectwhatup.us:5000/api/posts",	

	parse: function(data) {
		return data.objects;
	}
});

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