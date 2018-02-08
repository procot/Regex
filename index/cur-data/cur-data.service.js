angular.module('RegexTasks')
  .service('curData', ['$cookies', '$http',
    function($cookies, $http) {
      const self = this;
      this.isAuthorizated = () => !!$cookies.get('id');
      this.userName = () => this.isAuthorizated() ? $cookies.get('log') : '';
      if (this.isAuthorizated()) {
        $http.get(`/getUserInfo?_id=${$cookies.get('id')}`).then(response => {
          if (response.data.status != 'ok') {
            console.error('Error get user info');
            return;            
          }
          self.user = response.data.data;
        }).catch(reason => {
          console.error('Error get user info');
        });
      }
    }
  ]);