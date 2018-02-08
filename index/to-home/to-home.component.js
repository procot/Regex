angular.
    module('RegexTasks').
    component('toHome', {
        templateUrl: 'index/to-home/to-home.component.html',
        styleUrls: [ 'index/to-home/to-home.component.css' ],
        controller: ['$http', 'curData', '$rootScope',
            function toHomeController($http, curData, $rootScope) {
                document.title = 'Главная';

                $rootScope.url = '/';

                const self = this;
                $http.get('index/news/news.json').then((response) => {
                    self.lents = response.data;
                });
            }
        ]
    });