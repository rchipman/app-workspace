
class em
    unit = {}
    @unit = unit

Workspace = angular.module 'Workspace', ['ui.router']


Workspace.config ['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) ->
    $stateProvider
    .state 'app',
        abstract: true,
        template: '<div ui-view></div>',
    .state 'app.dashboard',
        url: '/:test'
        templateUrl: '/partials/dashboard/dashboard.tpl.html'
        # controller: 'DashboardCtrl',
    .state 'app.collaboration',
        url: '/collaboration/:id'
        templateUrl: '/partials/collaboration/collaboration-details.tpl.html'
        controller: 'CollaboartionCtrl'
]


Workspace.controller 'DashboardCtrl',
['$scope',
($scope) ->

      $scope.test = 'IT WORKS!'

      $scope.testChangeButton =
      (text) ->
          if !text then text = 'now test is this!'
          $scope.test = text
          em.unit

      em.unit
]
