angular.
	module('RegexTasks').
	component('toResults', {
		templateUrl: 'index/to-results/to-results.component.html',
		styleUrls: [ 'index/to-results/to-results.component.css' ],
		controller: ['curData', '$rootScope', '$cookies', '$location',
			function (curData, $rootScope, $cookies, $location) {
				if (!curData.isAuthorizated()) {
					$location.url($rootScope.url || '/');
					return;
				}
				$rootScope.url = '/task/results';
				this.taskTitle = classRegex.currentTask.titleRussian;
				this.results = curData.results;
				document.title = 'Результаты';
			}
		]
	});