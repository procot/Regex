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
            }).when('/:userLogin', {
                template: "<to-user></to-user>"
            }).when('/', {
                template: "<to-home></to-home>"
            }).otherwise('/');
        }
    ]);