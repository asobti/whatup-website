'use strict';

/*
	Service that enables communication between controllers
*/

whatUp.factory('EventBus', function($rootScope) {
	var bus = {
		paginationObj : null,

		pageChanged : function(pagination) {
			this.paginationObj = pagination;
			this.broadcastPageChanged();
		},

		broadcastPageChanged : function() {
			$rootScope.$broadcast('PageChanged');
		}
	};

	return bus;
});

var resourcePostsUrl = 	"http://projectwhatup.us\\:5000/api/"
		+ 'posts/:postId';
var resourceUsersUrl = 	"http://projectwhatup.us\\:5000/api/"
		+ 'users/:userId';
//		+ '?q={"order_by":[{"field"\\:"created_at","direction"\\:"desc"}]}';



angular.module('whatUpServices', ['ngResource'])
	.factory('Posts', function($resource){
		return $resource(resourcePostsUrl, {
			postId:"@id"
		}, {
			query: {
				method:"GET", 
				isArray:false
			},
			save:{
				method:"PUT"
			},
			create:{
				method:"POST"
			}
		})
	})
	.factory('Users', function($resource){
		return $resource(resourceUsersUrl, {}, {
			query: {
				method:"GET", 
				isArray:false
			}
		})
	});