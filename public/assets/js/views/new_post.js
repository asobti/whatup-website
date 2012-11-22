NewPostView = Backbone.View.extend({	
	el: "#new_post_btn_container",
	template:_.template($('#tpl-new-btn').html()),

	initialize: function(){
		console.log('init');
	},

	events : {		
		"click #new_post_btn" : "showForm"
	},

	render: function(){
		console.log('rendering');
		$(this.el).html(this.template());
		return this;
	},

	 showForm: function(){
		window.location = "#post/add";

	}
});
