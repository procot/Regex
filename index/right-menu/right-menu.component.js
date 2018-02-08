angular.module('RegexTasks')
  .component('rightMenu', {
    templateUrl: 'index/right-menu/right-menu.component.html',
    controller: ['curData', '$cookies', function(curData, $cookies) {
      this.isAuthorizated = curData.isAuthorizated;
      this.userName = curData.userName;
      this.logout = () => {
        $cookies.remove('id');
        $cookies.remove('log');
      }
    }]
  });