Workspace.controller('CollaborationDetailsCtrl', [
  '$scope', '$stateParams', 'collaborationService', function($scope, $stateParams, collaborationService) {
    $scope.currentCollaboration = _.find(collaborationService.mockData, function(item){
    	return item.collaboration.id == $stateParams.collaborationID;
    });
    return em.unit;
  }
]);