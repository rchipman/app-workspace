Workspace.controller('ProjectCtrl', [
  '$scope', '$stateParams', 'AnnotationService', function($scope, $stateParams, annotationService) {
    $scope.currentProject = _.find(annotationService.mockData, function(item) {
      return item.project.id === $stateParams.projectID;
    });
    return em.unit;
  }
]);
