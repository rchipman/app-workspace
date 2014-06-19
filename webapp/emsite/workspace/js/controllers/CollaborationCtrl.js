Workspace.controller('CollaborationCtrl', [
  '$scope', '$filter', 'ngTableParams', 'collaborationService', function($scope, $filter, ngTableParams, collaborationService) {
    var data;
    data = collaborationService.mockData;

    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 5,
      sorting: {
        'collaboration.hasRecentActivity': 'desc'
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