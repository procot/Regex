angular.
    module('RegexTasks').
    component('toRegistration', {
        templateUrl: 'index/to-registration/to-registration.component.html',
        styleUrls: [ 'index/to-registration/to-registration.component.css' ],
        controller: ['curData', '$http', '$location', '$rootScope', '$cookies',
        function (curData, $http, $location, $rootScope, $cookies) {
            if (curData.isAuthorizated()) {
                $location.url($rootScope.url || '/');
                return;
            }
            document.title = 'Регистрация';
            this.user = {};
            const self = this;
            this.reg = () => {
                $http.post('/account/registration', self.user).then(response => {
                    if (response.data.status != 'ok') {
                        alert('Такой пользователь уже зарегистрирован');
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
                    console.log('Error registration: ' + reason);
                })
            }
        }]
    });