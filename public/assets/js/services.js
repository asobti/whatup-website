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