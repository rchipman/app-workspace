Workspace.controller('AnnotationDetailsCtrl', [
  '$scope', '$stateParams', '$timeout', 'annotationService', 'fabricJsService', function($scope, $stateParams, $timeout, annotationService, fabricJsService) {

    $scope.currentCommentIndex = 3
    $scope.newCommentText = null

    var comment = {
        type: 'normal',
        name: 'Rob',
        email: md5('jrchipman1@gmail.com'),
        text: 'This is a comment that some dude left on here. cool.',
        annotationId: 3,
        timestamp: moment().fromNow()
    }

    var comment2 = {
        type: 'normal',
        name: 'Chris',
        email: md5('test@gmail.com'),
        text: 'Hey, what about the thing on the right here, don\'t forget to, do the stuff.',
        annotationId: 2,
        timestamp: moment().subtract('minutes', 30).fromNow()
    }

    var comment3 = {
        type: 'normal',
        name: 'Adam',
        email: md5('test@gmail.com'),
        text: 'I dont feel like the sky is as blue as it could be, perhaps we should revisit?',
        annotationId: 1,
        timestamp: moment().subtract('days', 1).fromNow()
    }

    // Highlights UI stuff, to be deleted
    $scope.comments = [comment,comment2,comment3]
    $scope.approved = [1,2,3,4]
    $scope.rejected = [1]
    $scope.images = [1,2,3,4,5,6]

    $scope.addComment = function () {
        $scope.comments.unshift({
            type: 'normal',
            name: 'Rob',
            email: md5('jrchipman1@gmail.com'),
            text: $scope.newCommentText,
            annotationId: ++$scope.currentCommentIndex,
            timestamp: moment().fromNow()
        })
        $scope.newCommentText = null
    }


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
      /* this circle stuff is just to debug the event handler
      var circle;
      circle = new fabric.Circle({
        radius: 10,
        fill: "rgba(" + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", 1)",
        stroke: "rgba(" + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", " + (Math.floor(Math.random() * 255) + 1) + ", 1)",
      });
      console.log(circle);
      $scope.currentAnnotationGroup.push(circle);
      */
      console.log(obj);
      // alert("You added an object group!");
      return em.unit;
    });
    return em.unit;
  }
]);
