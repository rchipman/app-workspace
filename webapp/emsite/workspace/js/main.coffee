
class em
   unit = {}
   @unit = unit

Workspace = angular.module 'Workspace', ['ui.router', 'ngTable']


Workspace.config
['$locationProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider',
($locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) ->
   $stateProvider
   .state 'app',
     abstract: true
     template: '<div ui-view></div>'
   .state 'app.dashboard',
     url: '/:test'
     templateUrl: '/partials/dashboard/dashboard.tpl.html'
     controller: 'DashboardCtrl'
   .state 'app.collaboration',
     url: '/collaboration/:id'
     templateUrl: '/partials/collaboration/collaboration-details.tpl.html'
     controller: 'CollaboartionCtrl'
]


Workspace.controller 'DashboardCtrl',
['$scope',
($scope) ->

   $scope.testChangeButton =
   (text) ->
     if !text then text = 'now test is this!'
     $scope.test = text
     em.unit

   em.unit
]

Workspace.controller 'collabTable',
['$scope', '$filter', 'ngTableParams'
($scope, $filter, ngTableParams) ->
  data = [
    {} =
      id: '47'
      project: 'July 2014'
      collab: 'Cover page Belize'
      owner: 'Shane Sandefur'
      approval: '3/5'
      last: '6/7/14'
    {} =
      id: '48'
      project: 'July 2014'
      collab: 'zCover page Belize'
      owner: 'Shane Sandefur'
      approval: '3/5'
      last: '6/7/14'
    {} =
      id: '49'
      project: 'July 2014'
      collab: 'aCover page Belize'
      owner: 'Shane Sandefur'
      approval: '3/5'
      last: '6/7/14'
  ]

  $scope.tableParams = new ngTableParams
    page: 1
    count: 5
    sorting:
      id: 'asc'
  ,
    total: data.length
    getData: ($defer, params) ->
      orderedData = if params.sorting() then $filter('orderBy')(data, params.orderBy()) else data
      $defer.resolve(orderedData.slice ((params.page() - 1) * params.count()), (params.page() * params.count()))
      em.unit

  em.unit

]
