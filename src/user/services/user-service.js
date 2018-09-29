(function (angular) {
	'use strict';

	angular
		.module('locus.user')
		.service('locus.user.userService', UserService);

	UserService.$inject = [
		'locus.user.UserModelFactory',
		'$http'
	];

	function UserService(User, $http) {
		var _users = [];
		var _defaultUrl = 'assets/json/user-data.json';

		var self = this;

		self.fetchUsers = fetchUsers;

		function fetchUsers(url) {
			return $http.get(url || _defaultUrl).then(function (data) {
				_users = buildUserObjects(data.data);
				return _users;
			});
		}

		function buildUserObjects(data) {
			if (!data) return;

			var users = [];

			data.map(function (d) {
				var user = new User(d);
				users.push(user);
			});

			return users;
		}
	}

})(angular);
