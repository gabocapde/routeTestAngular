// Controller for add
app.lazy.controller('addCtrl', [ '$scope', '$location', 'studentsInfoSvc', 'studentsAddedInfoSvc', function addCtrl($scope, $location, studentsInfoSvc, studentsAddedInfoSvc){
	$scope.pageClass = 'page-add';
	$scope.message = "";
	$scope.classToAdd = "";
	$scope.classRecentlyAdded = "";
	$scope.classToSelect = "";
	$scope.nameToAdd = "";
	$scope.gradeToAdd = "";
	
	$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
	$scope.StudentsAddedInfo = studentsAddedInfoSvc.StudentsAddedInfo;
	
	//Gets all classes individually
	$scope.Classes = [];
	angular.forEach($scope.StudentsInfo, function (item) {
		if ($scope.Classes.indexOf(item.class) == -1) {
			$scope.Classes.push(item.class);
		}
	});
	
	//Adds a grade for a student
	$scope.addGrade = function() {
		$scope.nameToAdd = $scope.nameToAdd.charAt(0).toUpperCase() + $scope.nameToAdd.slice(1);
		$scope.gradeToAdd = $scope.gradeToAdd.charAt(0).toUpperCase() + $scope.gradeToAdd.slice(1);
		$scope.grade = { 
			name : $scope.nameToAdd, 
			grade : $scope.gradeToAdd, 
			class : $scope.classToSelect 
		};
		studentsInfoSvc.StudentsInfo.push($scope.grade);
		studentsAddedInfoSvc.StudentsAddedInfo.push($scope.grade);
		$location.path('/AddGrade/' + $scope.classToSelect + '/' + $scope.nameToAdd + '/' + $scope.gradeToAdd + '/');
	}	

	//Adds a class 
	$scope.addClass = function() {
		$scope.classToAdd = $scope.classToAdd.charAt(0).toUpperCase() + $scope.classToAdd.slice(1);
		$scope.classRecentlyAdded = $scope.classToAdd.toUpperCase();
		$scope.Classes.push($scope.classToAdd);
		$scope.classToAdd = "";		
	}	
	
}]);