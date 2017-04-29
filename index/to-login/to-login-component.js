angular.module('toLogin', []);

angular.
    module('toLogin', []).
    component('toLogin', {
        templateUrl: 'index/to-login/to-login-template.html',
        controller: ['$rootScope', function toLoginController($rootScope) {
            $rootScope.title = 'Войти';
        }]
    });