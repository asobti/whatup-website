NewPost = Backbone.View.extend({
	el: "#new_post_btn",

	initialize: function(){

	},

	events : {		
		"click " + this.el : "test_me"
	},

	render: function(){

	},

	test_me : function(){
		alert("tested");
	}
});
