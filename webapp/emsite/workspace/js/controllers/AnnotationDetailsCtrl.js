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
    $
    $scope.currentAnnotationGroupId = 0;
    // _.contains(array, entry) -> bool is entry in array
    $scope.fabric.canvas.on('mouse:down', function() {
      if ($scope.annotationAction != null) {
        $timeout.cancel($scope.annotationAction);
      }
      return em.unit;
    });

    $scope.fabric.canvas.on('mouse:up', function(e) {
      console.log("mouse:up -> "+e);
      $scope.annotationAction = $timeout(function() {
        $scope.events.push({
          id: $scope.eventIndex++,
          text: 'Object added!'
        });
        console.log($scope.fabric.canvas.add);
        console.log($scope.currentAnnotationGroup);
        $scope.fabric.canvas.add(new fabric.Group($scope.currentAnnotationGroup, {
          top: 150,
          left: 100,
          angle: -10
        }));
        $scope.$apply();
        $scope.currentAnnotationGroup.push();
        alert("You added an object group!");
        return em.unit;
      }, 3000);
      return em.unit;
    });
    $scope.fabric.canvas.on('object:added', function(obj) {
        $scope.currentAnnotationGroup.push(new fabric.Circle({
            radius: Math.floor(Math.random() * 14) + 1,
            color: 'green'
        }));
        console.log("object:added");
        console.log(obj);
        return em.unit;
    });
    return em.unit;
  }
]);
