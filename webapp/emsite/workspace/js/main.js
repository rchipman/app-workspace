var Workspace, em;

em = (function() {
  var unit;

  function em() {}

  unit = {};

  em.unit = unit;

  return em;

})();

Workspace = angular.module('Workspace', ['ui.router', 'ngTable']);

Workspace.config;

[
  '$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', function($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
    return $stateProvider.state('app', {
      abstract: true,
      template: '<div ui-view></div>'
    }).state('app.dashboard', {
      url: '/:test',
      templateUrl: '/partials/dashboard/dashboard.tpl.html',
      controller: 'DashboardCtrl'
    }).state('app.collaboration', {
      url: '/collaboration/:id',
      templateUrl: '/partials/collaboration/collaboration-details.tpl.html',
      controller: 'CollaboartionCtrl'
    });
  }
];

Workspace.controller('DashboardCtrl', [
  '$scope', function($scope) {
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

Workspace.controller('collabTable', [
  '$scope', '$filter', 'ngTableParams', function($scope, $filter, ngTableParams) {
    var data;
    data = [
      {
        id: '47',
        project: 'July 2014',
        collab: 'Cover page Belize',
        owner: 'Shane Sandefur',
        approval: '3/5',
        last: '6/7/14'
      }, {
        id: '48',
        project: 'July 2014',
        collab: 'zCover page Belize',
        owner: 'Shane Sandefur',
        approval: '3/5',
        last: '6/7/14'
      }, {
        id: '49',
        project: 'July 2014',
        collab: 'aCover page Belize',
        owner: 'Shane Sandefur',
        approval: '3/5',
        last: '6/7/14'
      }
    ];
    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 5,
      sorting: {
        id: 'asc'
      }
    }, {
      total: data.length,
      getData: function($defer, params) {
        var orderedData;
        orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        return em.unit;
      }
    });
    return em.unit;
  }
]);
