angular.module('toRegistration', []);

angular.
    module('toRegistration', []).
    component('toRegistration', {
        templateUrl: 'index/to-registration/to-registration-template.html',
        controller: ['$rootScope', function toRegistrationController($rootScope) {
            $rootScope.showingMenu = false;
            $rootScope.title = 'Регистрация';
        }]
    });