(function (angular) {
	'use strict';

	angular
		.module('locus.search-box')
		.service('locus.search-box.searchBoxService', SearchBoxService);


	function SearchBoxService() {
		var _data = null;
		var _searchFields = null;

		var _searchableData = [];
		var _filteredData = [];

		var self = this;

		self.setData = setData;
		self.filterData = filterData;

		function setData(data, searchFields) {
			_data = data;
			_searchFields = searchFields;

			buildSearchableData();
		}

		function buildSearchableData() {
			if (!_data) return;

			for (var i = 0; i < _data.length; ++i) {
				var obj = _data[i];

				var objStr = '';
				_searchFields.map(function (field) {
					if (obj.hasOwnProperty(field)) {
						objStr = objStr + ' ' + obj[field];
					}
				});

				_searchableData.push(objStr.toLowerCase());
			}
		}

		function filterData(searchQuery, callback) {
			clearFilteredData();

			if (!searchQuery) return [];

			for (var i = 0; i < _searchableData.length; ++i) {
				if (_searchableData[i].includes(searchQuery.toLowerCase())) {
					var obj = _data[i];
					_filteredData.push(obj);
				}
			}

			callback(_filteredData);
		}

		function clearFilteredData() {
			_filteredData.length = 0;
		}
	}

})(angular);
