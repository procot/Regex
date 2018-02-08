angular.module('RegexTasks')
  .component('accMenu', {
    templateUrl: 'index/acc-menu/acc-menu.component.html',
    controller: ['curData', '$cookies', function(curData, $cookies) {
      this.isAuthorizated = curData.isAuthorizated;
      this.logout = () => {
        $cookies.remove('id');
        $cookies.remove('log');
      }
    }]
  });