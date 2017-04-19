angular.
    module('toHome').
    component('toHome', {
        template: '<div class="body"></div>',
        controller: ['$rootScope',
            function toHomeController($rootScope) {
                if (!classRegex.isAutorizated) {
                    $rootScope.buttons = [
                        {
                            "href": "registration",
                            "text": "Регистрация",
                            "click": ""
                        },
                        {
                            "href": "login",
                            "text": "Войти",
                            "click": ""
                        }
                    ];
                } else {
                    $rootScope.buttons = [
                        {
                            "href": "",
                            "text": "Выйти",
                            "click": "logOut()"
                        }
                    ];
                }
            }
        ]
    })