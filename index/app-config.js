angular.module("RegexTasks", [
    'ngRoute',
    'ngAnimate',
    'ngCookies'
]);

angular.
    module('RegexTasks').
    config(['$routeProvider', '$locationProvider',
        function config($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('!');
            $routeProvider.when('/login', {
                template: "<to-login></to-login>"
            }).when('/registration', {
                template: "<to-registration></to-registration>"
            }).when('/archieve', {
                template: "<to-archieve></to-archieve>"
            }).when('/user/:userLogin', {
                template: "<to-user></to-user>"
            }).when('/task/results', {
                template: "<to-results></to-results>"
            }).when('/task/:taskId', {
                template: "<to-task></to-task>"
            }).when('/', {
                template: "<to-home></to-home>"
            }).when('/task-information', {
                template: "<to-info></to-info>"
            }).otherwise('/');
        }
    ]);

angular.
    module('RegexTasks').
    controller('logOut',
        function logOut($rootScope) {
            $rootScope.logout = function() {
                classRegex.Logout();
                $rootScope.isAutorizated = false;
            }
        }
    );