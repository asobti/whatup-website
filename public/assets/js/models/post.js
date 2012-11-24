Post = Backbone.Model.extend({

	initialize : function(){
		this.on("error", this.error, this);	
	},

	validate : function(attrs){
		console.log('validating');
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