angular.
    module('toLogin', []).
    component('toLogin', {
        templateUrl: 'index/to-login/to-login-template.html',
        controller: ['$rootScope', function toLoginController($rootScope) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'index/to-login/to-login-style.css';
            document.querySelector('head').appendChild(link);
            $rootScope.style = 'index/to-login/to-login-style.css';
            $rootScope.script = 'index/to-login/to-login-script.js';

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