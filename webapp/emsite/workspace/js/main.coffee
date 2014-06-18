
class em
    unit = {}
    @unit = unit

Workspace = angular.module 'Workspace', ['ui.router', 'ngTable']

Workspace.run ['$rootScope', '$state', '$stateParams',
($rootScope,   $state,   $stateParams) ->
    $rootScope.$state = $state
    $rootScope.$stateParams = $stateParams
    em.unit
]


Workspace.config ['$stateProvider', '$urlRouterProvider',
($stateProvider, $urlRouterProvider) ->

    $stateProvider
    .state 'app',
        abstract: true
        views:
            'mainMenu':
                templateUrl: 'partials/navigation/main-menu.tpl.html'
                # controller: 'MainMenuCtrl'
            'sidebar':
                templateUrl: 'partials/navigation/sidebar.tpl.html'
                # controller: 'SidebarCtrl'
    .state 'app.dashboard',
        url: '/'
        views:
            'mainContentArea@':
                templateUrl: 'partials/dashboard/dashboard.tpl.html'
                controller: 'DashboardCtrl'
    .state 'app.collaborations',
        url: '/collaborations/:id'
        views:
            'mainContentArea@':

                templateUrl: 'partials/collaborations/collaborations.tpl.html'
                controller: 'CollaborationCtrl'

    em.unit
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

Workspace.controller 'CollaborationCtrl',
['$scope', '$filter', 'ngTableParams'
($scope, $filter, ngTableParams) ->
    data = [
        id: '47'
        project: 'July 2014'
        collab: 'Cover page Belize'
        owner: 'Shane Sandefur'
        approval: '3/5'
        last: '6/7/14'
    ,
        id: '48'
        project: 'July 2014'
        collab: 'zCover page Belize'
        owner: 'Shane Sandefur'
        approval: '3/5'
        last: '6/7/14'
    ,
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
