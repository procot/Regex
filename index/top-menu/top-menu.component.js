angular.module('RegexTasks')
  .component('topMenu', {
    templateUrl: 'index/top-menu/top-menu.component.html',
    controller: ['curData', function (curData) {
      this.userName = curData.userName;
      this.isAuthorizated = curData.isAuthorizated;
    }]
  });