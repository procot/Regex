angular.
	module('RegexTasks').
	component('toTask', {
		templateUrl: 'index/to-task/to-task.component.html',
		styleUrls: [ 'index/to-task/to-task.component.css' ],
		controller: ['curData', '$http', '$routeParams', '$rootScope',
		function (curData, $http, $routeParams, $rootScope) {
			this.taskId = $routeParams.taskId;
			const self = this;
			$rootScope.url = `/task/${this.taskId}`;
			this.isAuthorizated = curData.isAuthorizated;

			$http.get(`index/tasks/${this.taskId}.json`).then((res) => {
				self.task = res.data;

				document.title = self.task.title;
				curData.currentTask = {
					'titleRussian': self.task.title,
					'titleEnglish': this.taskId
				};
			});
			this.submit = () => {
				const data = {};
				data.code = document.querySelector('#code').value;
				data.titleEnglish = self.taskId;
				data.titleRussian = self.task.title;
				classRegex.Submit(data);
			}
		}]
	});