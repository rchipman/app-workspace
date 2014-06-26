Workspace.controller 'ProjectCtrl',
['$scope', '$stateParams', 'AnnotationService',
($scope, $stateParams, annotationService) ->
    $scope.currentProject = _.find annotationService.mockData,
    (item) ->
    	item.project.id == $stateParams.projectID;

    em.unit;
]
