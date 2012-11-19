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
	},
	create : function(data) {
		console.log('overriden create');
		
		$.ajax({
			"url" : this.url,
			"async" : true,
			"beforeSend" : function(obj){
				console.log(obj);
			},
			"contentType" : 'application/json',
			"crossDomain" : true,
			"dataType" : 'json',
			"type" : 'POST',
			"data" : JSON.stringify(data),
			"error" : function(err){
				console.log('new post creation failed');
				console.log(err);
			},
			"success" : function(resp){
				console.log('new post created');
				console.log(resp);
			}
		});
	}
});