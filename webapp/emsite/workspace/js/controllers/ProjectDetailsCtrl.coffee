Workspace.controller 'ProjectDetailsCtrl', 
['$scope', '$stateParams', 'collaborationService',
($scope, $stateParams, collaborationService) ->
    $scope.currentCollaboration = _.find collaborationService.mockData,
    (item) ->
    	item.project.id is parseInt $stateParams.projectID
    em.unit
]