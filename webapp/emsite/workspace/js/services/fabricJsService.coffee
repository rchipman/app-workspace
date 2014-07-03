Workspace.factory 'fabricJsService', () ->
    globscale = 1
    getSelf = (name) ->
        _.find(toolkit, name: name)

    toolkit = [
        {
            name: 'disabled'
            properties: {
                isDrawingMode: false
            }
            annotating: false,
        },
        {
            name: 'draw'
            properties: {
                isDrawingMode: true # this may be the only thing necessary
            }
            annotating: true
        },
        {
            name: 'move'
            properties: {
                isDrawingMode: false
            }
            annotating: false
        },
        {
            name: 'shape'
            properties: {
                isDrawingMode: false
            }
            annotating: true
            type: fabric.Circle
            # index of types is same as blanks, useful or dumb
            types: [fabric.Circle, fabric.Rect]
            drawparams: [
                (pointer) ->
                    {
                        radius: Math.abs self.origX - pointer.x
                    }
                ,
                (pointer) ->
                    {
                        width: -self.origX + pointer.x
                        height: -self.origY + pointer.y
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
                    self.mouseDown = false # theses self properties are probably a really bad convention, but it works
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
                        shape.set we.drawparams[we.types.indexOf we.type] pointer
                        canvas.renderAll()
                    em.unit
                }
            },
                {
                    name: 'comment'
                    properties: {
                        isDrawingMode: false
                    }
                    annotating: true # this is possibly broken because currently the pin is placed at last object
                    events: {
                        mouseup: null # will want to put something here !!!
                        mousedown: null
                        objectadded: null # then we should fully integrate the
                    }
                },
                {
                    name: 'arrow' # see below $$$
                    properties: {
                        isDrawingMode: false
                    }
                    annotating: true
                },
                {
                    name: 'text' # fabric has an existing text tool, need to find out how to use $$$
                    properties: {
                        isDrawingMode: false
                    }
                    annotating: true
                },
                {
                    name: 'zoom' # this implementation sucks !!! $$$
                    properties: {
                        isDrawingMode :false
                    }
                    annotating: false
                    events: {
                        mouseup: null
                        mousemove: (o, canvas) ->
                            if self.mouseDown
                                # this just doesn't work very well !!!
                                SCALE_FACTOR = 0.01
                                pointer = canvas.getPointer o.e
                                delta = origX - pointer.x
                                objects = canvas.getObjects()
                                # needs changes !!!
                                delta = Math.abs delta * SCALE_FACTOR
                                transform = [1+delta,0,0,1+delta,0,0]
                                console.log transform
                                for klass in objects
                                    # transformMatrix([scalex, shear, shear, scaley, translatex, translatey])
                                    # klass.setCoords()
                                    # klass.scaleX = delta
                                    # klass.scaleY = delta
                                    # klass.top = klass.top * delta
                                    # klass.left = klass.left * delta
                                    # klass.setCoords()
                                    klass.transformMatrix = transform
                                    klass.setCoords()
                                # can we also transform the canvas background?
                                # canvas.backgroundImage.transformMatrix = transform  # works
                                # canvas.transformMatrix = transform                  # doesn't work
                        mousedown: (o, canvas) ->
                            self.origX = canvas.getPointer(o.e).x
                    }
                },
                {
                    name: 'colorpicker' # no implementation $$$
                    properties: {}
                    annotating: false
                },
                {
                    name: 'load' # temporary?
                    properties: {}
                    annotating: false
                },
                {
                    name: 'export'
                    properties: {}
                    annotating: false
                }
    ]
    init: (path) ->
        returnCanvas = {}
        (() ->
            docGet = (id) -> # do we need this anymore?
                document.getElementById id

            canvas = @__canvas = new fabric.Canvas 'annotation_canvas'
                # want to ditch this setup for instead using the tool selection to create parameters
                # {
                #     isDrawingMode: true
                # }

            canvas.on "after:render", () ->
                canvas.calcOffset()
                em.unit

            # okay here's where I try to get around the weird bugs (misunderstandings) with fabric.Image
            # it seems like a clunky way to do this, but it works and nothing short of it did

            # first step is to cheat and use fabric's underlying logic to make an HTML element object

            fabric.util.loadImage path, (src) ->
                # second step is to turn this HTML element object into a fabric.Image
                realImage = new fabric.Image(src)
                # third step is set the dimensions of the canvas to those of the new image
                canvas.setWidth realImage.width
                canvas.setHeight realImage.height
                # fourth/fifth steps?  Try changing the size of the canvas to the image's dimensions
                canvas.setBackgroundImage realImage, canvas.renderAll.bind canvas
                em.unit






            # canvas.setBackgroundImage path, canvas.renderAll.bind(canvas)

            # canvas.on('mouse:down', function(o){
            #     // select appropriate function based on selected tool
            #     // we need some var in the scope to keep track of 'active tool selection'
            #     // the value of this var will point to the function that should be passed to the event handlers
            #     // should the function be passed in directly or define another function that handles the
            #     // specialized event handling... if the latter, then the mouse event should control the
            #     // mouseDown variable exclusively to ensure no weird condition overlap

            returnCanvas = canvas

            em.unit
        )()

        (() ->
            # does this even work? maybe scrap if the call to calcOffset above is sufficient
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
