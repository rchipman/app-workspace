Workspace.controller 'CollaborationCtrl',
['$scope', '$filter', 'ngTableParams', 'collaborationService',
($scope, $filter, ngTableParams, collaborationService) ->
    data = collaborationService.mockData

    $scope.tableParams = new ngTableParams
      page: 1
      count: 5
      sorting:
        'collaboration.hasRecentActivity': 'desc'
    ,
      total: data.length
      getData: ($defer, params) ->
        orderedData = if params.sorting() then $filter('orderBy')(data, params.orderBy()) else data
        $defer.resolve orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
        em.unit
    em.unit
]