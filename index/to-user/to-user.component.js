angular.
	module('RegexTasks').
	component('toUser', {
		templateUrl: 'index/to-user/to-user.component.html',
		controller: ['curData', '$http', '$routeParams', '$rootScope',
		function toUserController(curData, $http, $routeParams, $rootScope) {
			this.userName = $routeParams.userLogin;
			$rootScope.url = `/user/${this.userName}`;
			$http.get(`index/users/${this.userName}.json`).then((res) => {
				this.user = res.data;

			});
			document.title = this.userName;
		}]
	});