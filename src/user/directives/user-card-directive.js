(function (angular) {
	'use strict';

	angular
		.module('locus.user')
		.directive('userCard', function () {
			return {
				restrict: 'E',
				scope: {
					user: '='
				},
				templateUrl: 'src/user/directives/user-card-directive.html'
			}
		});

})(angular);
