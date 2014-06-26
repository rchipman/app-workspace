Workspace.controller 'AnnotationDetailsCtrl',
['$scope', '$stateParams', 'AnnotationService',
($scope, $stateParams, annotationService) ->
    $scope.currentAnnotation = _.find annotationService.mockData,
    (item) ->
    	item.annotation.id is parseInt $stateParams.annotationID
    em.unit
]
