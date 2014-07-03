Workspace.controller('AnnotationDetailsCtrl', [
  '$rootScope', '$scope', '$stateParams', '$timeout', 'annotationService', 'fabricJsService', function($rootScope, $scope, $stateParams, $timeout, annotationService, fabricJsService) {
    var comment, comment2, comment3, commentPin, timeoutFunc, usefulKeys;
    $rootScope.$broadcast('navigatedTo', 'Annotations');
    self.mouseDown = null;
    self.origX = 0;
    self.origY = 0;
    $scope.currentCommentIndex = 3;
    $scope.newCommentText = null;
    $scope.thumbs = [];
    $scope.approvalHash = {};
    $scope.thumbs = [
      {
        name: 'Maybe Art',
        src: 'img/BlueBus.jpg',
        id: 104
      }, {
        name: 'Stupid Art',
        src: 'img/ForMom.jpg',
        id: 101
      }, {
        name: 'Nice Art',
        src: 'img/FenceDog.jpg',
        id: 102
      }, {
        name: 'Great Art',
        src: 'img/TigerTug.jpg',
        id: 103
      }
    ];
    comment = {
      type: 'normal',
      name: 'Rob',
      email: md5('jrchipman1@gmail.com'),
      text: 'This is a comment that some dude left on here. cool.',
      annotationId: 3,
      timestamp: moment().fromNow()
    };
    comment2 = {
      type: 'normal',
      name: 'Chris',
      email: md5('test@gmail.com'),
      text: 'Hey, what about the thing on the right here, don\'t forget to do the stuff.',
      annotationId: 2,
      timestamp: moment().subtract('minutes', 30).fromNow()
    };
    comment3 = {
      type: 'normal',
      name: 'Adam',
      email: md5('test@gmail.com'),
      text: 'I dont feel like the sky is as blue as it could be, perhaps we should revisit?',
      annotationId: 1,
      timestamp: moment().subtract('days', 1).fromNow()
    };
    $scope.comments = [comment, comment2, comment3];
    $scope.approved = [1, 2, 3, 4];
    $scope.rejected = [1];
    $scope.images = [1, 2, 3, 4, 5, 6];
    $scope.collectionid = 102;
    $scope.loadImages = function(collectionid) {
      var markers;
      markers = {
        "query": [
          {
            "field": "id",
            "operator": "matches",
            "values": ["*"]
          }
        ]
      };
      $.ajax({
        type: "POST",
        url: "/entermedia/services/json/search/data/asset?catalogid=media/catalogs/public",
        data: JSON.stringify(markers),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        async: false,
        success: function(data) {
          var tempArray;
          tempArray = [];
          $.each(data.results, function(index, obj) {
            var path;
            path = "http://localhost:8080/emshare/views/modules/asset/downloads/preview/thumbsmall/" + obj.sourcepath + "/thumb.jpg";
            $scope.thumbs.push(path);
            console.log(fabric.util.loadImage(path, function(src) {
              return $scope.fabric.canvas.add(new fabric.Image(src));
            }));
            return em.unit;
          });
          return em.unit;
        },
        failure: function(errMsg) {
          alert(errMsg);
          return em.unit;
        }
      });
      return em.unit;
    };
    $scope.addComment = function() {
      $scope.fabric.canvas.add(commentPin());
      $scope.origX = null;
      $scope.origY = null;
      $scope.comments.unshift({
        type: 'normal',
        name: 'Rob',
        email: md5('jrchipman1@gmail.com'),
        text: $scope.newCommentText,
        annotationId: $scope.currentCommentIndex += 1,
        timestamp: moment().fromNow()
      });
      $scope.newCommentText = null;
      $scope.readyToComment = false;
      return em.unit;
    };
    $scope.selectTool = function(toolname) {
      var prop;
      $scope.currentTool = _.findWhere($scope.fabric.toolkit, {
        name: toolname
      });
      for (prop in $scope.currentTool.properties) {
        $scope.fabric.canvas[prop] = $scope.currentTool.properties[prop];
      }
      return em.unit;
    };
    $scope.setApproval = function(user, approvalState) {
      return $scope.approvalHash[user] = approvalState;
    };
    $scope.getApprovals = function() {
      var user, _results;
      _results = [];
      for (user in $scope.approvalHash) {
        if ($scope.approvalHash[user] === true) {
          _results.push(user);
        }
      }
      return _results;
    };
    $scope.getRejections = function() {
      var user, _results;
      _results = [];
      for (user in $scope.approvalHash) {
        if ($scope.approvalHash[user] === false) {
          _results.push(user);
        }
      }
      return _results;
    };
    $scope.annotations = [];
    $scope.events = [];
    usefulKeys = [''];
    $scope.currentAnnotation = _.find(annotationService.mockData, function(item) {
      return item.annotation.id === parseInt($stateParams.annotationID);
    });
    $scope.fabric = fabricJsService.init($scope.currentAnnotation.annotation.path);
    $scope.selectTool('draw');
    $scope.eventIndex = 0;
    $scope.annotationAction = null;
    $scope.currentAnnotationGroup = [];
    $scope.currentAnnotationGroupId = 0;

    /*
       This whole process is muddled, what should happen is simple:
       user clicks to draw a shape, that shape is added to the current group upon object:added
       a timeout function begins to check if they are done annotating
       if the user clicks again within a time window, the timeout function is cancelled
       repeat process until...
       user finishes annotation, they should be prompted for a comment
       a pin should be created and added into the annotationGroup data
       the pin should be rendered on screen somewhere appropriate and...
       the comment should be added to scope with annotationGroup data to be attached to comment
     */
    commentPin = function() {
      return new fabric.Group([
        new fabric.Circle({
          radius: 18.5,
          fill: "#fff"
        }), new fabric.Circle({
          radius: 14,
          fill: "#4fabe5",
          top: 5,
          left: 5
        }), new fabric.Text($scope.currentCommentIndex.toString(), {
          fontSize: 20,
          fill: "#fff",
          left: 13,
          top: 4
        })
      ], {
        evented: false,
        top: $scope.origX,
        left: $scope.origY
      });
    };
    timeoutFunc = function() {
      var annotationSpec;
      $scope.events.push({
        id: $scope.eventIndex += 1,
        text: 'Object added!'
      });
      $scope.readyToComment = true;
      $timeout((function() {
        return $('#user-comment-input').focus();
      }), 100);
      $scope.selectTool('disabled');
      annotationSpec = {
        id: $scope.currentCommentIndex += 1,
        group: $scope.currentAnnotationGroup,
        user: $scope.currentUser,
        comment: $scope.newCommentText
      };
      $scope.annotations.push(annotationSpec);
      $scope.currentAnnotationGroup = [];
      $scope.$apply();
      return em.unit;
    };
    $scope.fabric.canvas.on('mouse:down', function(e) {
      var pointer, _ref;
      self.mouseDown = true;
      if ($scope.annotationAction !== null) {
        $timeout.cancel($scope.annotationAction);
      }
      pointer = $scope.fabric.canvas.getPointer(e.e);
      self.origX = pointer.x;
      self.origY = pointer.y;
      if ((_ref = $scope.currentTool.events) != null) {
        if (typeof _ref.mousedown === "function") {
          _ref.mousedown(e, $scope.fabric.canvas);
        }
      }
      return em.unit;
    });
    $scope.fabric.canvas.on('mouse:up', function(e) {
      var _ref;
      self.mouseDown = false;
      if ($scope.currentTool.annotating) {
        $scope.annotationAction = $timeout(timeoutFunc, 2000);
      }
      if ((_ref = $scope.currentTool.events) != null) {
        if (typeof _ref.mouseup === "function") {
          _ref.mouseup(e, $scope.fabric.canvas);
        }
      }
      return em.unit;
    });
    $scope.fabric.canvas.on('mouse:move', function(e) {
      var _ref;
      if ((_ref = $scope.currentTool.events) != null) {
        if (typeof _ref.mousemove === "function") {
          _ref.mousemove(e, $scope.fabric.canvas);
        }
      }
      return em.unit;
    });
    $scope.fabric.canvas.on('object:added', function(obj) {
      var _ref;
      if ($scope.currentTool.annotating) {
        $scope.currentAnnotationGroup.push(obj);
      }
      if ((_ref = $scope.currentTool.events) != null) {
        if (typeof _ref.objectadded === "function") {
          _ref.objectadded(obj, $scope.fabric.canvas);
        }
      }
      $scope.fabric.canvas.renderAll();
      $scope.fabric.canvas.calcOffset();
      if (!$scope.origX) {
        $scope.origX = obj.target.top - 15;
      }
      if (!$scope.origY) {
        $scope.origY = obj.target.left - 15;
      }
      console.log($scope.origX, $scope.origY);
      return em.unit;
    });
    return em.unit;
  }
]);
