angular.module('toHome', []);

angular.
    module('toHome').
    component('toHome', {
        templateUrl: 'index/to-home/to-home-template.html',
        controller: ['$rootScope', '$http',
            function toHomeController($rootScope, $http) {
                $rootScope.title = 'Главная';
                if (!classRegex.isAutorizated) {
                    $rootScope.isAutorizated = false;
                } else {
                    $rootScope.isAutorizated = true;
                    $rootScope.userName = classRegex.user.login;
                }

                const self = this;
                $http.get('index/news/news.json').then((response) => {
                    self.lents = response.data;
                });
            }
        ]
    });