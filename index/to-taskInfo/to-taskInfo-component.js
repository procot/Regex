angular.module('toInfo', []);

angular.
	module('toInfo').
	component('toInfo', {
		templateUrl: 'index/to-taskInfo/to-taskInfo-template.html',
		controller: ['$rootScope', 
			function toTaskInfoController($rootScope) {
				$rootScope.title = 'Оформление кода для отправки на сервер';
                if (!classRegex.isAutorizated) {
                    $rootScope.isAutorizated = false;
                } else {
                    $rootScope.isAutorizated = true;
                    $rootScope.userName = classRegex.user.login;
                }
			}
		]
	});