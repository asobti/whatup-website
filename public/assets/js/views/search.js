SearchView = Backbone.View.extend({	
	el: "#search_container",
	template:_.template($('#tpl-search-form').html()),
	search: "#search_form",

	events : {		
		"keyup :input" : "search"
	},

	render: function(){		
		$(this.el).html(this.template());
		return this;
	},

	search: function(e){
		console.log($(this.search).val());
	}

//	 showForm: function(){
//		window.location = "#post/add";
//	}

	
});
