// Controller for list
app.lazy.controller('listCtrl', function listCtrl($scope, $routeParams, studentsInfoSvc){
	$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
	$scope.RouteParams = $routeParams;
});