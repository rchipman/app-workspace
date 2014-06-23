Workspace.controller 'ProjectCtrl', 
['$scope', '$stateParams', 'collaborationService',
($scope, $stateParams, collaborationService) ->
    $scope.currentProject = _.find collaborationService.mockData, 
    (item) ->
    	item.project.id == $stateParams.projectID;
    
    em.unit;
]