Workspace.controller 'CollaborationDetailsCtrl', 
['$scope', '$stateParams', 'collaborationService',
($scope, $stateParams, collaborationService) ->
    $scope.currentCollaboration = _.find collaborationService.mockData,
    (item) ->
    	item.collaboration.id is parseInt $stateParams.collaborationID
    em.unit
]