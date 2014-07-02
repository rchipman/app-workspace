Workspace.factory 'fabricJsService', () ->
    getSelf = (name) ->
        _.find(toolkit, name: name)
    toolkit = [
        {
            name: 'draw'
            properties: {}
        },
        {
            name: 'move'
            properties: {}
        },
        {
            name: 'shape'
            properties: {}
            type: fabric.Circle
            # index of types is same as blanks, useful or dumb
            types: [fabric.Circle, fabric.Rect]
            drawparams: [
                (pointer) ->
                    {
                        radius: Math.abs(self.origX - pointer.x)
                    }
                ,
                (pointer) ->
                    {
                        width: -(self.origX - pointer.x),
                        height: -(self.origY - pointer.y)
                    }
            ]
            blanks: [
                {
                    radius: 1
                    strokeWidth: 5
                    stroke: 'red'
                    selectable: false
                    fill: ""
                    originX: 'center'
                    originY: 'center'
                },
                {
                    height: 1
                    width: 1
                    strokeWidth: 5
                    stroke: 'red'
                    selectable: false
                    fill: ""
                    originX: 'left'
                    originY: 'top'
                }
            ]
            events: {
 
                # I don't think it makes sense to put these weird event-based props on $scope, so the implementation
                # is bad and confusing maybe the canvas should know current shape/current tool, but when you have multiple
                # people drawing it is hard to say without knowing more about how the canvases are deployed
                # i.e. is it one canvas on server being manipulated or multiple canvases per user being pushed to
                # merge with server copy

 

                mouseup: (e, canvas) ->
                    # not sure if this is best way to do this
                    # do I even need to pass 'canvas' if it will be valid within executing scope?
                    # definitely don't want to put a lot of junk on $scope if I don't have to
                    self.mouseDown = false
                mousedown: (e, canvas) ->
                    self.mouseDown = true # gotta be a better way !!!
                    pointer = canvas.getPointer e.e
                    we = getSelf 'shape'
                    spec = we.blanks[we.types.indexOf we.type] # this probably doesn't do what I think it should !!!
                    spec.left = pointer.x
                    spec.top = pointer.y
                    shape = new we.type spec
                    canvas.add shape
                    em.unit                              
                objectadded: null
                mousemove: (e, canvas) ->
                    if self.mouseDown # just awful !!!
                        we = getSelf('shape')
                        pointer = canvas.getPointer e.e
                        # need to find some way to get the shape now
                        shape = canvas.getObjects()[canvas.getObjects().length-1]
                        console.log shape
                        shape.set we.drawparams[we.types.indexOf we.type] pointer
                        canvas.renderAll()
                    em.unit
                }
            },
                {
                    name: 'comment'
                    properties: {}
                    events: {
                        mouseup: null # will want to put something here !!!
                        mousedown: null # seems like this should be happening in AnnotationDetailsCtrl
                        objectadded: null # then we should fully integrate the 
                    }
                },
                {
                    name: 'arrow' # see below $$$
                    properties: {}
                },
                {
                    name: 'text' # fabric has an existing text tool, need to find out how to use $$$
                    properties: {}
                },
                {
                    name: 'zoom' # this implementation sucks !!! $$$
                    properties: {}
                },
                {
                    name: 'colorpicker' # no implementation $$$
                    properties: {}
                }
    ]
    init: (path) ->
        returnCanvas = {}
        (() ->
            docGet = (id) ->
                document.getElementById(id)

            canvas = @__canvas = new fabric.Canvas 'annotation_canvas',
                {
                    isDrawingMode: true
                }

            canvas.on "after:render", () ->
                canvas.calcOffset()
                em.unit

            canvas.setBackgroundImage path, canvas.renderAll.bind(canvas)

            #drawingModeEl = docGet 'drawing-mode'
            #drawingOptionsEl = docGet 'drawing-mode-options'
            #drawingColorEl = docGet 'drawing-color'
            #drawingShadowColorEl = docGet 'drawing-shadow-color'
            #drawingLineWidthEl = docGet 'drawing-line-width'
            #drawingShadowWidth = docGet 'drawing-shadow-width'
            #drawingShadowOffset = docGet 'drawing-shadow-offset'
            #clearEl = docGet 'clear-canvas'
            #imageJSONEl = docGet 'image-to-json'



            ###
            I doubt that we can even perform this logic in the factory, and it
            belongs in a controller I assume
            ###            

            # clearEl.onclick = () ->

            #     # we probably don't even want this

            #     canvas.clear()
            #     em.unit

            # imageJSONEl.onclick = () ->

            #     # convert canvas to a json string

            #     json = JSON.stringify canvas.toJSON()
            #     console.log json
            #     em.unit

            # drawingColorEl.onchange = () ->
            #     # this needs a better implementation
            #     canvas.freeDrawingBrush.color = @value
            #     em.unit

            # drawingShadowColorEl.onchange = () ->
            #     canvas.freeDrawingBrush.shadowColor = @value
            #     em.unit

            # drawingLineWidthEl.onchange = () ->
            #     canvas.freeDrawingBrush.width = parseInt(@value, 10) || 1
            #     @previousSibling.innerHTML = @value
            #     em.unit

            # if canvas.freeDrawingBrush
            #     canvas.freeDrawingBrush.color = drawingColorEl.value
            #     canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1
            #     canvas.freeDrawingBrush.shadowBlur = 0

            # canvas.on('mouse:down', function(o){
            #     // select appropriate function based on selected tool
            #     // we need some var in the scope to keep track of 'active tool selection'
            #     // the value of this var will point to the function that should be passed to the event handlers
            #     // should the function be passed in directly or define another function that handles the
            #     // specialized event handling... if the latter, then the mouse event should control the
            #     // mouseDown variable exclusively to ensure no weird condition overlap
            #     mouseDown = true;
            #     if (canvas.isShapeMode) {
            #         shapeStart(o);
            #     } else if (canvas.isZoomingMode) {
            #         // Do zooming init
            #         origX = canvas.getPointer(o.e).x;
            #     }
            # });

            # canvas.on('mouse:move', function(o){
            #     if (canvas.isShapeMode) {
            #         // do the circle drawing action for now
            #         shapeDraw(o);
            #     } else if (canvas.isZoomingMode) {
            #         // handle zoom by drag
            #         var SCALE_FACTOR = 1.1;
            #         var pointer = canvas.getPointer(o.e);
            #         var delta = origX - pointer.x;
            #         var objects = canvas.getObjects();
            #         //var dd = 1;
            #         //if (delta == 5) dd=SCALE_FACTOR;
            #         //if (delta == -5) dd=1/SCALE_FACTOR;
            #         //globscale = globscale * dd;
            #         for (var i in objects) {
            #             objects[i].setCoords();
            #             objects[i].scaleX = globscale;
            #             objects[i].scaleY = globscale;
            #             objects[i].left = objects[i].left * delta;
            #             objects[i].top = objects[i].top * delta;
            #             objects[i].setCoords();
            #         }
            #     canvas.renderAll();
            #     canvas.calcOffset();
            #     }
            # });

            # canvas.on('mouse:up', function(o){
            #     # // this is all that is needed here right now, eventually
            #     # // the timeout function can handle comment posting
            #     # mouseDown = false;
            #     $scope.currentTool.events.mouseup(o)

            returnCanvas = canvas

            em.unit
        )()

        (() ->
            fabric.util.addListener fabric.window, 'load', () ->
                canvas = @__canvas || @canvas
                canvases = @__canvases || @canvases

                canvas and canvas.calcOffset and canvas.calcOffset()

                if canvases and canvases.length
                    for [0..canvases.length]
                        canvases[i].calcOffset()
                em.unit
                
        )()
        canvas: returnCanvas
        toolkit: toolkit
