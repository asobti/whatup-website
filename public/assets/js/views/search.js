SearchView = Backbone.View.extend({	
	el: "#search_container",
	template:_.template($('#tpl-search-form').html()),

//	events : {		
//		"click #new_post_btn" : "showForm"
//	},

	render: function(){		
		$(this.el).html(this.template());
		return this;
	},

//	 showForm: function(){
//		window.location = "#post/add";
//	}
});
