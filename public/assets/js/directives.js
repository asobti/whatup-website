'use strict';
whatUp.directive('tagInput', function() {
	return function(scope, element, attrs) {
		$(element[0]).on('keydown', function(e) {
			// enter (13) or spacebar (32) or tab (9)
			if (e.which === 13 || e.which === 32 || e.which === 9) {
				console.log('enter pressed');				
				e.preventDefault();
				scope.tagFinished();				
				scope.$apply();
			}
		});
	}
});

whatUp.directive('autoComplete', function() {
	return function(scope, element, attrs) {
		$(element[0]).autocomplete({
			delay : 500,
			minLength : 2,
			source : function(request, response) {
				console.log('Term being searched for: ' + request.term);
				var url = "http://api.projectwhatup.us/tags?q=";
				var query = {
					filters : [
						{
							name : "name",
							op : "like",
							val : "%" + request.term + "%"
						}
					]
				};
				var finalUrl = encodeURI(url + JSON.stringify(query));
				$.ajax({
					url  : finalUrl,
					type : 'GET',
					dataType : 'json',
					success : function(obj) {
						var suggestions = [];
						$.each(obj.objects, function(index, item) {
							suggestions.push(item.name);
						});
						response(suggestions);
					},
					xhrFields : {
						withCredentials : true
					}
				});
			},
			focus : function(event, ui) {
				scope.currentTag = ui.item.value;
				scope.$apply();
			}
		});
	}
});

whatUp.directive('enterKeyDown', function() {
	return function(scope, element, attrs) {
		$(element[0]).on('keydown', function(e) {
			// enter (13)
			if (e.which === 13) {
				e.preventDefault();
				var func = attrs.enterKeyDown;
				scope.$eval(func);				
			}
		});
	}
});

whatUp.directive('attachmentWatch', function() {
	return function(scope, element, attrs) {
		$(element[0]).on('change', function() {
			scope.uploadAttachment();		
		});
	}
});
