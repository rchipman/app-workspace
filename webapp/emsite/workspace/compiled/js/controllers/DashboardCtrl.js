Workspace.controller('DashboardCtrl', [
  '$scope', function($scope) {
    $scope.testChangeButton = function(text) {
      if (!text) {
        text = 'now test is this!';
      }
      $scope.test = text;
      return em.unit;
    };
    return em.unit;
  }
]);
