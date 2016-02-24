// Controller for numbers
app.lazy.controller('numbersCtrl', function numbersCtrl($scope, $location, studentsInfoSvc, studentsNumbersInfoSvc){
		$scope.pageClass = 'page-numbers';
		$scope.nameToAdd = "";
		$scope.numberToAdd = "";

		$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
		$scope.StudentsNumbersInfo = studentsNumbersInfoSvc.StudentsNumbersInfo;
			
		//Checks if the students has already a number added 
		$scope.checkName = function(array, search) {
			for(var i = 0; i < array.length; i++) {
				if (array[i]["name"] === search) return true;
			}
			return false;
		};		
		
		
		//Adds the students to the select box only one time and checks if the students already has a number added
		$scope.checkStudentsNames = function() {
			$scope.Students = [];
			angular.forEach($scope.StudentsInfo, function (item) {
				if (($scope.Students.indexOf(item.name) == -1) && (!$scope.checkName($scope.StudentsNumbersInfo, item.name))) {
					$scope.Students.push(item.name);
				}
			});
		};	

		$scope.checkStudentsNames();

		//Adds a number for a student
		$scope.addNumber = function() {
			$scope.nameToAdd = $scope.nameToAdd.charAt(0).toUpperCase() + $scope.nameToAdd.slice(1);;
			$scope.number = { 
				name : $scope.nameToAdd, 
				number : $scope.numberToAdd 
			};
			studentsNumbersInfoSvc.StudentsNumbersInfo.push($scope.number);
			$scope.StudentsNumbersInfo = studentsNumbersInfoSvc.StudentsNumbersInfo;
			$scope.nameToAdd = "";
			$scope.numberToAdd = "";
			$scope.checkStudentsNames();			
			
		};	

});