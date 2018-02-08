angular.
    module('RegexTasks').
    component('toLogin', {
        templateUrl: 'index/to-login/to-login.component.html',
        styleUrls: [ 'index/to-login/to-login.component.css' ],
        controller: ['curData', '$http', '$location', '$rootScope', '$cookies',
        function toLoginController(curData, $http, $location, $rootScope, $cookies) {
            if (curData.isAuthorizated()) {
                $location.url($rootScope.url || '/');
                return;
            }
            document.title = 'Войти';
            this.user = {};
            const self = this;
            this.logIn = () => {
                $http.post('/account/login', self.user).then(response => {
                    if (response.data.status != 'ok') {
                        alert('Такой пользователь еще не зарегистрирован');
                    } else {
                        let date = new Date();
						date.setMonth(date.getMonth() + 1);
						date = date.toUTCString();
                        $cookies.put('id', response.data.data.id, { expires: date });
                        $cookies.put('log', response.data.data.login, { expires: date });
                        $http.get(`/getUserInfo?_id=${response.data.data.id}`).then(response => {
                            if (response.data.status != 'ok') {
                              console.error('Error get user info');
                              return;            
                            }
                            curData.user = response.data.data;
                        }).catch(reason => {
                            console.error('Error get user info');
                        });
                        $location.url($rootScope.url);
                    }
                }).catch(reason => {
                    console.log('Error login: ' + reason);
                })
            }
        }]
    });