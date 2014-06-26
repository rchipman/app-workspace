Workspace.controller('ProjectDetailsCtrl', [
  '$scope', '$stateParams', 'AnnotationService', function($scope, $stateParams, annotationService) {
    $scope.currentAnnotation = _.find(annotationService.mockData, function(item) {
      return item.project.id === parseInt($stateParams.projectID);
    });
    return em.unit;
  }
]);
