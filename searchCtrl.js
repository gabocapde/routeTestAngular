// Controller for search
app.lazy.controller('searchCtrl', function searchCtrl($scope, $location, studentsInfoSvc){
		$scope.pageClass = 'page-search';
		$scope.nameToSearch = "";
		$scope.selectedClass = "";
		$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
		
		//Gets all classes individually
		$scope.Classes = [];
		angular.forEach($scope.StudentsInfo, function (item) {
			if ($scope.Classes.indexOf(item.class) == -1) {
				$scope.Classes.push(item.class);
			}
		});
		
		//Function for searching a class when the select box is used
		$scope.onChange = function() {
			$location.path('/Class/' + $scope.selectedClass);
		}

		//Function for searching a students using form
		$scope.searchName = function() {
			$location.path('/List/' + $scope.nameToSearch);
		}

});