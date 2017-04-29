angular.module('toArchieve', []);

angular.
    module('toArchieve').
    component('toArchieve', {
        templateUrl: 'index/to-archieve/to-archieve-template.html',
        controller: ['$rootScope', '$http', 
        function toArchieveController($rootScope, $http) {
            $rootScope.title = 'Архив задач';
            if (!classRegex.isAutorizated) {
                $rootScope.isAutorizated = false;
            } else {
                $rootScope.isAutorizated = true;
                $rootScope.userName = classRegex.user.login;
            }

            const self = this;

            $http.get('index/to-archieve/tasks.json').then((res) => {
                self.allTasks = res.data;
            });
        }]
    });