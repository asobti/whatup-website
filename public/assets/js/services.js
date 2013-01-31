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

var resourcePostsUrl = 	whatUp.apiRoot + 'posts/:postId';

var resourceUsersUrl = 	whatUp.apiRoot + 'users/:userId';
//		+ '?q={"order_by":[{"field"\\:"created_at","direction"\\:"desc"}]}';

var resourceTagsUrl = whatUp.apiRoot + 'tags/:tagId';


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
		}, {
			withCredentials : true
		})
	})
	.factory('Users', function($resource){		
		return $resource(resourceUsersUrl, {}, {
			query: {
				method:"GET", 
				isArray:false
			}
		}, {
			withCredentials : true
		})
	})
	.factory('Tags', function($resource) {
		return $resource(resourceTagsUrl, {
			tagId : '@id'
		}, {
			query : {
				method : 'GET',
				isArray : false
			}
		})
	}, {
		withCredentials : true
	});