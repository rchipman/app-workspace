Workspace.controller 'AnnotationDetailsCtrl', 
['$scope', '$stateParams', 'annotationService',
($scope, $stateParams, annotationService) ->
    $scope.currentAnnotation = _.find annotationService.mockData,
    (item) ->
    	item.annotation.id is parseInt $stateParams.annotationID
    em.unit
]