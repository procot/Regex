angular.module('toUser', []);

angular.
	module('toUser').
	component('toUser', {
		templateUrl: 'index/to-user/to-user-template.html',
		controller: ['$rootScope', '$http', '$routeParams',
		function toUserController($rootScope, $http, $routeParams) {
			this.userName = $routeParams.userLogin;
			$http.get(`index/users/${this.userName}.json`).then((res) => {
				this.userInfo = res.data;

				$rootScope.title = this.userName;
                $rootScope.showingMenu = true;
                if (!classRegex.isAutorizated) {
                    $rootScope.isAutorizated = false;
                } else {
                    $rootScope.isAutorizated = true;
                    $rootScope.userName = classRegex.user.login;
                }
			});
		}]
	});