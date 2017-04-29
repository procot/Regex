angular.module("RegexTasks", [
    'toLogin',
    'ngRoute',
    'toHome',
    'toRegistration',
    'toArchieve',
    'toTask',
    'toUser',
    'toResults',
    'toInfo',
    'ngAnimate'
]);

angular.
    module('RegexTasks').
    config(['$routeProvider',
        function config($routeProvider) {
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