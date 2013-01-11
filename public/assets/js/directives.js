'use strict';

whatUp.directive('tagInput', function() {

	return function(scope, element, attrs) {

		$(element[0]).on('keydown', function(e) {
			// enter (13) or spacebar (32) or tab (9)
			if (e.which === 13 || e.which === 32 || e.which === 9) {
				e.preventDefault();
				scope.tagFinished();
				scope.$apply();
			}
		});

		$(element[0]).on('blur', function(e) {
			scope.tagFinished();
			scope.$apply();
		});
	}
});