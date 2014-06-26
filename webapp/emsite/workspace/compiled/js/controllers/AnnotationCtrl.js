Workspace.controller('AnnotationCtrl', [
  '$scope', '$filter', 'ngTableParams', 'AnnotationService', function($scope, $filter, ngTableParams, annotationService) {
    var data;
    data = annotationService.mockData;
    $scope.tableParams = new ngTableParams({
      page: 1,
      count: 5,
      sorting: {
        'annotation.hasRecentActivity': 'desc'
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
    return null;
  }
]);
