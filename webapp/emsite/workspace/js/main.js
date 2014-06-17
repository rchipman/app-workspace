var Workspace, em;

em = (function() {
  var unit;

  function em() {}

  unit = {};

  em.unit = unit;

  return em;

})();

Workspace = angular.module('Workspace', ['ui.router']);

Workspace.config([
  '$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
    return $stateProvider.state('app', {
      abstract: true,
      template: '<div ui-view></div>'
    }).state('app.dashboard', {
      url: '/:test',
      templateUrl: '/partials/dashboard/dashboard.tpl.html'
    }).state('app.collaboration', {
      url: '/collaboration/:id',
      templateUrl: '/partials/collaboration/collaboration-details.tpl.html',
      controller: 'CollaboartionCtrl'
    });
  }
]);

Workspace.controller('DashboardCtrl', [
  '$scope', function($scope) {
    $scope.test = 'IT WORKS!';
    $scope.testChangeButton = function(text) {
      if (!text) {
        text = 'now test is this!';
      }
      $scope.test = text;
      return em.unit;
    };
    return em.unit;
  }
]);
