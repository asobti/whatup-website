Post = Backbone.Model.extend({	
	//urlRoot: "http://projectwhatup.us:5000/api/posts",	
	url: function() {
    	return 'http://projectwhatup.us:5000/api/posts/' + this.id;
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