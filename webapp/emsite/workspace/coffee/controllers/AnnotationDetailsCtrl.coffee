# Workspace.controller 'AnnotationDetailsCtrl', 
# ['$scope', '$stateParams', 'annotationService',
# ($scope, $stateParams, annotationService) ->
#     $scope.currentAnnotation = _.find annotationService.mockData,
#     (item) ->
#     	item.annotation.id is parseInt $stateParams.annotationID
#     em.unit
# ]


# working js file is located at AnnotationDetailsCtrl_orig.js
# this is a buggy CoffeeScript
Workspace.controller 'AnnotationDetailsCtrl', 
['$scope', '$stateParams', '$timeout', 'annotationService', 'fabricJsService',
($scope, $stateParams, $timeout, annotationService, fabricJsService) ->

	$scope.currentCommentIndex = 3 # should probably be deprecated to have annotation index tied to comment index
	$scope.newCommentText = null
	$scope.approvalHash = {} # empty obj for user: approval kv pairs

	comment = 
	{
	    type: 'normal'
	    name: 'Rob'
	    email: md5 'jrchipman1@gmail.com' 
	    text: 'This is a comment that some dude left on here. cool.'
	    annotationId: 3
	    timestamp: moment().fromNow()
	}

	comment2 = 
	{
	    type: 'normal'
	    name: 'Chris'
	    email: md5 'test@gmail.com' 
	    text: 'Hey, what about the thing on the right here, don\'t forget to do the stuff.'
	    annotationId: 2
	    timestamp: moment().subtract('minutes', 30).fromNow()
	}

	comment3 = 
	{
	    type: 'normal'
	    name: 'Adam'
	    email: md5 'test@gmail.com' 
	    text: 'I dont feel like the sky is as blue as it could be, perhaps we should revisit?'
	    annotationId: 1
	    timestamp: moment().subtract('days', 1).fromNow()
	}

	# Highlights UI stuff, to be deleted
	$scope.comments = [comment,comment2,comment3]
	$scope.approved = [1..4]	# deprecated? unless property approach more favored in angular vs methods?
	$scope.rejected = [1]		# deprecated? maybe not since method method doesn't work?
	$scope.images = [1..6]		# deprecated but so is below line since thumb generation is free from EM
	$scope.thumbs = ['img/thumbs/BlueBus.gif','img/thumbs/ForMom.gif','img/thumbs/Baseball-Player.gif','img/thumbs/FenceDog.gif','img/thumbs/TigerTug.gif','img/thumbs/hs-2003-28-a-1280x768_wallpaper.gif']

	$scope.addComment =
	() ->
	    $scope.comments.unshift {
	        type: 'normal'
	        name: 'Rob'
	        email: md5 'jrchipman1@gmail.com'
	        text: $scope.newCommentText
	        annotationId: ++$scope.currentCommentIndex
	        timestamp: moment().fromNow()
	    }
	    $scope.newCommentText = null
	    em.unit

	$scope.setApproval =
	(user, approvalState) ->
		$scope.approvalHash[user] = approvalState # totally unsafe

	$scope.getApprovals =
	() ->
		(user for user of $scope.approvalHash when $scope.approvalHash[user] is true)

	$scope.getRejections = 
	() ->
		(user for user of $scope.approvalHash when $scope.approvalHash[user] is false)

	$scope.annotations = []		# holds all annotation groups (should be one per unique annotation w/ comment)
	$scope.events = []			# events attribute holds information about the unique event
	usefulKeys = ['']			# i dunno
	$scope.currentAnnotation = _.find annotationService.mockData, 
	(item) ->
		item.annotation.id is parseInt $stateParams.annotationID 
	# uses init function to create the fabric environment
	$scope.fabric = fabricJsService.init $scope.currentAnnotation.annotation.path
	$scope.eventIndex = 0
	$scope.annotationAction = null
	$scope.currentAnnotationGroup = []
	$scope.currentAnnotationGroupId = 0
	# _.contains(array, entry) -> bool is entry in array

    ###
      This whole process is muddled, what should happen is simple:
        user clicks to draw a shape, that shape is added to the current group upon object:added
          a timeout function begins to check if they are done annotating
        if the user clicks again within a time window, the timeout function is cancelled
          repeat process until...
        user finishes annotation, they should be prompted for a comment
          a pin should be created and added into the annotationGroup data
          the pin should be rendered on screen somewhere appropriate and...
          the comment should be added to scope with annotationGroup data to be attached to comment
    ###
	timeoutFunc = () ->
    	$scope.events.push {id: $scope.eventIndex++,  text: 'Object added!'}
	    # lazy prompting and comment addition
	    $scope.newCommentText = prompt "Enter a comment:" || "<no comment?>"
	    # add little pin to canvas???
	    annotationSpec = 
	    {
	        id: $scope.currentCommentIndex+1
	        group: $scope.currentAnnotationGroup
	        user: $scope.currentUser
	        comment: $scope.newCommentText
	    }
	    $scope.addComment()
	    # oh please tell me there is a non-ugly way to do this (I bet that's what Coffee is for)
	    canvasContents = $scope.fabric.canvas.getObjects()
	    dropPoint = canvasContents[canvasContents.length-1];
	    # fix this ^^^
	    console.log $scope.fabric.canvas.getObjects()
	    # make the crappy pin shape
	    pinGroup = new fabric.Group [new fabric.Circle({
		        radius: 15
		        fill: "#000fff"
		        borderColor: "#fff"
		    }),

	      	new fabric.Text $scope.currentCommentIndex.toString(), 
		      	{
			        fontSize: 30
			        color: "#ffffff"
			        left: 5
			        top: -5
		      	}
    	],
		    {
		        evented: false
		        top: dropPoint.top
		        left: dropPoint.left
		    }
	    $scope.fabric.canvas.add pinGroup
	    # now push annotation info to scope for longer-term tracking
	    $scope.annotations.push annotationSpec
	    $scope.currentAnnotationGroup = []
	    # alert("You added an object group!");
	    $scope.$apply()  # is this even necessary here?
	    em.unit

	$scope.fabric.canvas.on 'mouse:down', () ->
	 	if $scope.annotationAction isnt null
	    	$timeout.cancel $scope.annotationAction
	    	em.unit

	$scope.fabric.canvas.on 'mouse:up', (e) ->
	  	$scope.annotationAction = 
	  		$timeout timeoutFunc, 2000
	  	em.unit

	$scope.fabric.canvas.on 'object:added', (obj) ->
	    $scope.currentAnnotationGroup.push obj
	    em.unit
	em.unit
]