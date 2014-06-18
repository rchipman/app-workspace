var Workspace, em;

em = (function() {
  var unit;

  function em() {}

  unit = {};

  em.unit = unit;

  return em;

})();

Workspace = angular.module('Workspace', ['ui.router', 'ngTable']);

Workspace.run([
  '$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    return em.unit;
  }
]);

Workspace.config([
  '$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
      abstract: true,
      views: {
        'mainMenu': {
          templateUrl: 'partials/navigation/main-menu.tpl.html'
        },
        'sidebar': {
          templateUrl: 'partials/navigation/sidebar.tpl.html'
        }
      }
    }).state('app.dashboard', {
      url: '/',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/dashboard/dashboard.tpl.html',
          controller: 'DashboardCtrl'
        }
      }
    }).state('app.collaborations', {
      url: '/collaborations/:id',
      views: {
        'mainContentArea@': {
          templateUrl: 'partials/collaborations/collaborations.tpl.html',
          controller: 'CollaborationCtrl'
        }
      }
    });
    return em.unit;
  }
]);

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

Workspace.controller('CollaborationCtrl', [
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
