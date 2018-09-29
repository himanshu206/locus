(function (angular) {
	'use strict';

	angular
		.module('locus.user')
		.factory('locus.user.UserModelFactory', UserModelFactory);

	function UserModelFactory() {

		function UserModel(modelData) {
			this.id = modelData.id;
			this.name = modelData.name;
			this.items = modelData.items;
			this.address = modelData.address;
			this.pinCode = modelData.pincode;
		}

		return UserModel;
	}

})(angular);
