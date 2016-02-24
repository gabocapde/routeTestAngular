var app = angular.module('routingTest', ['ngRoute', 'ngAnimate']);

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
		.when('/AddGrade', {
			templateUrl: 'AddGrade.html',
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
		.when('/AddGrade/:Class/:Student/:Grade', {
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
		.when('/Class/:ClassName', {
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
		.when('/Numbers', {
			templateUrl: 'Numbers.html',
			controller : 'numbersCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'numbersCtrl',
					], function () {
						$rootScope.$apply(function () { deferred.resolve(); });
					});
					return deferred.promise;
				}]
			}
		})
		.when('/About', {
			templateUrl: 'About.html',
			controller : 'aboutCtrl',
			resolve: {
				load: ['$q', '$rootScope', function ($q, $rootScope) {
					var deferred = $q.defer();
					require ([
						'aboutCtrl',
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

// Service for Students Info
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

// Service for Added Students Info
app.service('studentsAddedInfoSvc', function() {
    this.StudentsAddedInfo = [];
});

// Service for Numbers of Students
app.service('studentsNumbersInfoSvc', function() {
    this.StudentsNumbersInfo = [];
});


// Directive for Classes Tables
app.directive('tablesGrades', function () { 
    return { 
		scope:{
			tablesGrades : "=",
			nameParam : "=",
			classParam : "="
		},
        restrict : 'A',
        replace : true,
		link : function(scope) {
			//Gets all classes individually
			scope.Classes = [];
			angular.forEach(scope.tablesGrades, function (item) {
				if (scope.Classes.indexOf(item.class) == -1) {
					scope.Classes.push(item.class);
				}
			});
			
			//Returns wethers it has grades for that class or not
			scope.hasGrades = function(className, name) {
				if (name == undefined){
					return true;
				}else{
					name = name.charAt(0).toUpperCase() + name.slice(1);;
					for(var i = 0; i < scope.tablesGrades.length; i++) {
						if ((scope.tablesGrades[i]["name"].substring(0, name.length) == name) && (scope.tablesGrades[i]["class"] === className)){
							return true;
						}
					}
					return false;
				}
            } 
		},
        templateUrl : '_tablesGrades.html'
    } 
});

// Directive for Numbers Tables
app.directive('tablesNumbers', function () { 
    return { 
		scope:{
			tablesNumbers : "="
		},
        restrict : 'A',
        replace : true,
		link : function(scope) {},
        templateUrl : '_tablesNumbers.html'
    } 
});

// Directive for Input Numbers Validation
app.directive('inputValidation', function () { 
    return { 
		scope:{
			inputValidation : "="
		},
        restrict : 'A',
        replace : true,
		link : function(scope) {
			scope.$watch('inputValidation', function(val) {
				//Strips input from special characters and gets first 10 digits
				scope.inputValidation = scope.inputValidation.replace(/[^\d]/g, '');
				scope.inputValidation = scope.inputValidation.substring(0, 10);
				scope.aux = scope.inputValidation;
				//Formats phone numbers depending on phone number pattern
				scope.inputValidation = '(' + scope.inputValidation.substr(0, 3) + ') ' + scope.inputValidation.substr(3, 3) + '-' + scope.inputValidation.substr(6,4)
				
				//Removes special characters added when there aren´t enough digits
				if (scope.aux.length <7){
					scope.inputValidation = scope.inputValidation.replace(/-/g, '');					
					if (scope.aux.length <4){
						scope.inputValidation = scope.inputValidation.replace(/\) /g, '');					
						if (scope.aux.length <1){
							scope.inputValidation = scope.inputValidation.replace(/\(/g, '');					
						}
					}
				}
            });

		},
        templateUrl : '_inputValidation.html'
    } 
});
