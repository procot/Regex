angular.
    module('RegexTasks').
    component('toArchieve', {
        templateUrl: 'index/to-archieve/to-archieve.component.html',
        styleUrls: [ 'index/to-archieve/to-archieve.component.css' ],
        controller: ['$http', 'curData', '$rootScope',
        function toArchieveController($http, curData, $rootScope) {
            document.title = 'Архив задач';
            const self = this;
            $rootScope.url = '/archieve';
            $http.get('index/to-archieve/tasks.json').then((res) => {
                self.allTasks = res.data;
            });
        }]
    });