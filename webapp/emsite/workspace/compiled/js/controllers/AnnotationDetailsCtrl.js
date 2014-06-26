Workspace.controller('AnnotationDetailsCtrl', [
  '$scope', '$stateParams', 'AnnotationService', function($scope, $stateParams, annotationService) {
    $scope.currentAnnotation = _.find(annotationService.mockData, function(item) {
      return item.annotation.id === parseInt($stateParams.annotationID);
    });
    return em.unit;
  }
]);
