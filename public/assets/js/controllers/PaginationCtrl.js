'use strict';

function PaginationCtrl($scope, eventBus) {
	// default values
	$scope.currentPage = 0;
	$scope.totalPages = 0;
	$scope.pages = [];

	// event listener
	$scope.$on('PageChanged', function() {
		var pagination = eventBus.paginationObj;

		if (pagination !== null) {
			$scope.currentPage = pagination.currentPage;
			$scope.totalPages = pagination.totalPages;
			
			generatePages();
		}
	});

	$scope.hasPreviousPage = function() {
		return ($scope.currentPage > 1);
	};

	$scope.hasNextPage = function() {
		return ($scope.currentPage < $scope.totalPages);
	};	

	$scope.getPrevPageLink = function() {
		if ($scope.hasPreviousPage()) {
			return '#/posts/' + ($scope.currentPage - 1);
		} else {
			return 'javascript:void()';
		}
	};

	$scope.getNextPageLink = function() {
		if ($scope.hasNextPage()) {
			return '#/posts/' + ($scope.currentPage + 1);
		} else {
			return 'javascript:void()';
		}
	};

	var generatePages = function() {	
		$scope.pages = [];	

		for(var i = 1; i <= $scope.totalPages; i++) {

			var page = {
				title : 'Page ' + i,
				number : i,
				class : '',
				link : '#/posts/' + i
			};

			// if current page, disable the button
			if (i === $scope.currentPage) {
				page.class = 'disabled';
				page.link = 'javascript:void()';
			}

			$scope.pages.push(page);
			
		}
		
	};
}

PaginationCtrl.$inject = ['$scope', 'EventBus'];
