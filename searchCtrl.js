// Controller for search
app.lazy.controller('searchCtrl', function searchCtrl($scope, $location, studentsInfoSvc){
		$scope.pageClass = 'page-search';
		$scope.nameToSearch = "";
		$scope.selectedClass = "";
		$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
		$scope.Classes = [];
		angular.forEach($scope.StudentsInfo, function (item) {
			if ($scope.Classes.indexOf(item.class) == -1) {
				$scope.Classes.push(item.class);
			}
		});
		
		$scope.onChange = function() {
			$location.path('/Class/' + $scope.selectedClass);
		}

		$scope.searchName = function() {
			$location.path('/List/' + $scope.nameToSearch);
		}

});