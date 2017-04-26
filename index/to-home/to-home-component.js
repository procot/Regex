angular.module('toHome', []);

angular.
    module('toHome').
    component('toHome', {
        templateUrl: 'index/to-home/to-home-template.html',
        controller: ['$rootScope',
            function toHomeController($rootScope) {
                $rootScope.title = 'Главная';
                $rootScope.showingMenu = true;
                if (!classRegex.isAutorizated) {
                    $rootScope.isAutorizated = false;
                } else {
                    $rootScope.isAutorizated = true;
                    $rootScope.userName = classRegex.user.login;
                }
            }
        ]
    });