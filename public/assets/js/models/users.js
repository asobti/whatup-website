var UserModel = Backbone.Model.extend({

});

var UserCollection = Backbone.Collection.extend({
	model : UserModel,
	url : "http://projectwhatup.us:5000/api/users",

	parse : function(data) {
		return data.objects;
	}
});