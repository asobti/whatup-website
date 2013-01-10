'use strict';

whatUp.directive('tagInput', function() {

	return function(scope, element, attrs) {

		$(element[0]).on('keypress', function(e) {
			if (e.which === 13) {
				scope.tagFinished();
				scope.$apply();
			}
		});
	}
});