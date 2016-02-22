var app = angular.module('routingTest', ['ngRoute']);

//routeProvider config
app.config(['$routeProvider','$controllerProvider','$compileProvider','$filterProvider','$provide',function($routeProvider,$controllerProvider,$compileProvider,$filterProvider,$provide) {
	app.lazy = {
		controller: $controllerProvider.register,
		directive: $compileProvider.directive,
		filter: $filterProvider.register,
		factory: $provide.factory,
		service: $provide.service,
	};
	$routeProvider.
		when('/Search', {
			templateUrl: 'Search.html',
			controller : 'searchCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'searchCtrl',
					], function () {
						$rootScope.$apply(function () { deferred.resolve(); });
					});
					return deferred.promise;
				}]
			}
		})
		.when('/Add', {
			templateUrl: 'Add.html',
			controller : 'addCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'addCtrl',
					], function () {
						$rootScope.$apply(function () { deferred.resolve(); });
					});
					return deferred.promise;
				}]
			}
		})
		.when('/List', {
			templateUrl: 'List.html',
			controller : 'listCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'listCtrl',
					], function () {
						$rootScope.$apply(function () { deferred.resolve(); });
					});
					return deferred.promise;
				}]
			}
		})
		.when('/List/:Name', {
			templateUrl: 'List.html',
			controller : 'listCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'listCtrl',
					], function () {
						$rootScope.$apply(function () { deferred.resolve(); });
					});
					return deferred.promise;
				}]
			}
		})
		.otherwise({
			redirectTo: '/Search'
		});
}]);

app.service('studentsInfoSvc', function() {
    this.StudentsInfo = 
        [
		{ name : "John", grade : "A", class : "Geography" },
		{ name : "Alice", grade : "B", class : "History" },
		{ name : "Alice", grade : "C", class : "Geography" },
		{ name : "Brian", grade : "B", class : "English" },
		{ name : "Brian", grade : "A", class : "History" },
		{ name : "Alice", grade : "D", class : "English" },
		{ name : "John", grade : "C", class : "English" },
		{ name : "John", grade : "D", class : "History" },
		{ name : "Brian", grade : "A", class : "Geography" }
		];
});


app.directive('tablesGrades', function () { 
    return { 
		scope:{
			tablesGrades : "=",
			nameParam : "="
		},
        restrict : 'A',
        replace : true,
		link : function(scope) {
			scope.groupArray = [];
			angular.forEach(scope.tablesGrades, function (item, idx) {
				if (scope.groupArray.indexOf(item.class) == -1) {
					scope.groupArray.push(item.class);
				}
			});
		},        
        templateUrl : '_tablesGrades.html'
    } 
});
