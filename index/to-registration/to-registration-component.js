angular.
    module('toRegistration', []).
    component('toRegistration', {
        templateUrl: 'index/to-registration/to-registration-template.html',
        controller: ['$rootScope', function toRegistrationController($rootScope) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'index/to-registration/to-registration-style.css';
            document.querySelector('head').appendChild(link);
            $rootScope.style = 'index/to-registration/to-registration.style.css';
            $rootScope.script = 'index/to-registration/to-registration.script.js';

            $rootScope.buttons = [
                {
                    "href": "registration",
                    "text": "Регистрация"
                },
                {
                    "href": "login",
                    "text": "Войти"
                }
            ];
        }]
    });