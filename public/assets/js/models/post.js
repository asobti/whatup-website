Post = Backbone.Model.extend({
	initialize: function(){
		console.log("post init~" + this.get('topic'));
	}
});

Posts = Backbone.Collection.extend({
	model: Post,
	//url: "http://projectwhatup.us:5000/api/posts",
	url: "test.json",

	parse: function(data)
	{
		return data.objects;
	}
});