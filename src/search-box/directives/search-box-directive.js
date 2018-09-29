(function (angular, document) {
	'use strict';

	angular
		.module('locus.search-box')
		.directive('searchBox', function () {
			return {
				restrict: 'E',
				scope: {
					data: '=',
					placeholder: '@',
					noResultsFoundMessage: '@',
					searchFields: '=',
					searchedResults: '=',
					activeItemClass: '@'
				},
				templateUrl: 'src/search-box/directives/search-box-directive.html',
				controller: SearchBoxDirectiveCtrl
			}
		});

	SearchBoxDirectiveCtrl.$inject = [
		'$scope',
		'$document',
		'locus.search-box.searchBoxService'
	];

	function SearchBoxDirectiveCtrl($scope, $document, searchBoxService) {
		var _KEY = {
			DOWN: 40,
			UP: 38,
			ENTER: 13
		};

		$scope.filteredData = null;
		$scope.currentNavigationIndex = -1;
		$scope.showDropdownList = true;
		$scope.keypadNavigationActive = false;

		$scope.handleSearchQueryChange = handleSearchQueryChange;
		$scope.handleKeyUp = handleKeyUp;
		$scope.syncKeypadNavigationWithMouseHover = syncKeypadNavigationWithMouseHover;
		$scope.loadSearchedResults = loadSearchedResults;

		$scope.$watch('data', function () {
			searchBoxService.setData($scope.data, $scope.searchFields);
		});

		$document.on('click', function (event) {
			if (event.target.id == 'container') {
				return;
			}

			$scope.$evalAsync(function () {
				showSearchDropdownList(false);
			});
		});

		
		/* 
			Work Horse Functions 
			==================================================
		*/		
		
		function handleSearchQueryChange() {
			filterData();
			showSearchDropdownList(true);
		}

		function filterData() {
			searchBoxService.filterData($scope.searchQuery, function (results) {
				$scope.filteredData = results;
				resetDropdownListNavigation();
			});
		}
		
		function handleKeyUp(event) {
			switch (event.keyCode) {
				case _KEY.UP: navigateListUp(event);
					break;

				case _KEY.DOWN: navigateListDown(event);
					break;

				case _KEY.ENTER: loadSearchedResults();
					break;
			}
		}	
		
		function syncKeypadNavigationWithMouseHover(event) {
			if (!event) return;
			
			if (!$scope.isKeypadNavigationActive) {
				updateDropdownListNavigation(this.$index);
			} else {
				resetKeypadNavigation(false);
			}
		}	

		function loadSearchedResults(data) {
			showSearchDropdownList(false);
			clearSearchedResults();

			if (data) {
				setSearchQuery(data.name);
				$scope.searchedResults.push(data);
			} else {
				filterData();

				for (var i = 0; i < $scope.filteredData.length; ++i) {
					var obj = $scope.filteredData[i];
					$scope.searchedResults.push(obj);
				}
			}
		}
		
		function navigateListUp(event) {
			if (!event) return;

			activateKeypadNavigation(true);
			decrementListNavigation();

			if ($scope.currentNavigationIndex == -1) {
				updateDropdownListNavigation($scope.filteredData.length - 1);
			}

			findNavigatedElementAndScrollIntoView($scope.currentNavigationIndex);
		}
		
		function navigateListDown(event) {
			if (!event) return;

			activateKeypadNavigation(true);
			incrementListNavigation();

			if ($scope.currentNavigationIndex == $scope.filteredData.length) {
				updateDropdownListNavigation(0);
			}

			findNavigatedElementAndScrollIntoView($scope.currentNavigationIndex);
		}		
		
		function findNavigatedElementAndScrollIntoView(atIndex) {
			var ele = findNavigatedListElement(atIndex);
			if (ele && ele[0]) {
				scrollElementIntoViewIfNeeded(ele[0]);
			}
		}		
		
		function scrollElementIntoViewIfNeeded(ele) {
			if (!ele) return;

			var eleParent = document.getElementById('search-list');
			if (eleParent) {
				var containerRect = eleParent.getBoundingClientRect();
				var eleRect = ele.getBoundingClientRect();

				if (eleRect.top < containerRect.top || eleRect.bottom > containerRect.bottom) {
					ele.scrollIntoView(
						{
							behaviour: 'smooth',
							block: 'nearest'
						}
					);
				}
			}
		}
		
		function findNavigatedListElement(atIndex) {
			if (atIndex === undefined || atIndex === null) return;

			var navigatedObj = $scope.filteredData[atIndex];
			setSearchQuery(navigatedObj.name);

			var ele = document.getElementById(navigatedObj.id);
			return angular.element(ele);
		}
		
		
		
		/* 
			Quick Helper Functions 
			==================================================
		*/
		
		function setSearchQuery(value) {
			$scope.searchQuery = value;
		}
		
		function showSearchDropdownList(flag) {
			$scope.showDropdownList = flag;
		}	
		
		function clearSearchedResults() {
			$scope.searchedResults.length = 0;
		}
		
		function updateDropdownListNavigation(toIndex) {
			if (toIndex === undefined || toIndex === null) return;

			$scope.currentNavigationIndex = toIndex;
		}
		
		function incrementListNavigation() {
			updateDropdownListNavigation($scope.currentNavigationIndex + 1);
		}
		
		function decrementListNavigation() {
			updateDropdownListNavigation($scope.currentNavigationIndex - 1);
		}
		
		function resetDropdownListNavigation() {
			updateDropdownListNavigation(-1);
		}

		function activateKeypadNavigation(flag) {
			$scope.isKeypadNavigationActive = flag;
		}
		
		function resetKeypadNavigation() {
			activateKeypadNavigation(false);
		}		
	}
})(angular, document);
