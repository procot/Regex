angular.
	module('RegexTasks').
	component('toInfo', {
		templateUrl: 'index/to-task-info/to-task-info.component.html',
		styleUrls: [ 'index/to-task-info/to-task-info.component.css' ],
		controller: ['curData', '$rootScope',
			function (curData, $rootScope) {
				$rootScope.url = '/task-information';
				document.title = 'Оформление кода для отправки на сервер';
			}
		]
	});