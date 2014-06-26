Workspace.controller('AnnotationDetailsCtrl', [
  '$scope', '$stateParams', '$timeout', 'annotationService', 'fabricJsService', function($scope, $stateParams, $timeout, annotationService, fabricJsService) {
    var usefulKeys;
    $scope.annotations = [];
    // events attribute holds information about the unique event
    $scope.events = [];
    usefulKeys = [''];
    $scope.currentAnnotation = _.find(annotationService.mockData, function(item) {
      return item.annotation.id === parseInt($stateParams.annotationID);
    });
    // uses init function to create the fabric environment
    $scope.fabric = fabricJsService.init($scope.currentAnnotation.annotation.path);
    $scope.eventIndex = 0;
    $scope.annotationAction = null;
    $scope.currentAnnotationGroup = [];
    $scope.currentAnnotationGroupId = 0;
    $scope.fabric.canvas.on('mouse:down', function() {
      if ($scope.annotationAction != null) {
        $timeout.cancel($scope.annotationAction);
      }
      return em.unit;
    });
    $scope.fabric.canvas.on('mouse:up', function(e) {
      console.log(e);
      $scope.annotationAction = $timeout(function() {
        $scope.events.push({
          id: $scope.eventIndex++,
          text: 'Object added!'
        });
        $scope.fabric.canvas.add(new fabric.Group($scope.currentAnnotationGroup, {
          top: 150,
          left: 100,
          angle: -10
        }));
        $scope.currentAnnotationGroup = [];
        $scope.$apply();
        return em.unit;
      }, 3000);
      return em.unit;
    });
    $scope.fabric.canvas.on('object:added', function(obj) {
      // this logic seems slightly recursive
      // circles are being placed more often than expected
      var circle;
      circle = new fabric.Circle({
        radius: 10,
        fill: "",
        stroke: "rgba(" + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", 1)",
      });
      console.log(circle);
      $scope.currentAnnotationGroup.push(circle);
      return em.unit;
    });
    return em.unit;
  }
]);
