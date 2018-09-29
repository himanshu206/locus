(function (angular) {
	'use strict';

	angular
		.module('locus')
		.controller('AppMainCtrl', AppMainCtrl);

	AppMainCtrl.$inject = [
		'$scope',
		'locus.user.userService'
	];

	function AppMainCtrl($scope, userService) {
		$scope.searchedResults = [];

		userService.fetchUsers().then(function (users) {
			$scope.users = users;
			$scope.searchFields = Object.keys($scope.users[0]);
		});
	}

})(angular);
