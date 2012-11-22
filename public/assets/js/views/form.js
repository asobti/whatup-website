FormView = Backbone.View.extend({
	template:_.template($('#tpl-new-post-form').html()),
	el: ".posts",

	initialize : function(){


	},

	render : function(){
		console.log('rendering form');
		$(this.el).html(this.template());
	},

	events : {
		"click #post_add_cancel" : "cancelPost"
	},

	cancelPost : function(){
		var contents = $('textarea').val();	
		console.log(contents);
		if (contents) {
			if (confirm("Are you sure you want to discard this post")) {
				window.history.back();
			}			
		} else {
			window.history.back();
		}

		
	}
});