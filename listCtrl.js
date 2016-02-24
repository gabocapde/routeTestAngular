// Controller for list
app.lazy.controller('listCtrl', function listCtrl($scope, $routeParams, studentsInfoSvc){
	$scope.pageClass = 'page-list';
	$scope.StudentsInfo = studentsInfoSvc.StudentsInfo;
	$scope.RouteParams = $routeParams;
});