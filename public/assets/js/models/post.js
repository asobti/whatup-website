Post = Backbone.Model.extend({	
	initialize: function(){
		//console.log("post init~" + this.get('topic'));
	},

	defaults : {
		topic : 'Default title',
		body : 'Default body',		
		user_id : 1,
		//tags : ['test', 'web']
	}
});

Posts = Backbone.Collection.extend({
	model: Post,
	url: "http://projectwhatup.us:5000/api/posts",
	//url: "test.json",

	parse: function(data) {
		return data.objects;
	}
});