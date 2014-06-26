Workspace.factory('fabricJsService', function() {
  return {
    init: function(path) {
        var returnCanvas;
        var mouseDown, origX, origY, shape, currentShape, shapeSpec
        currentShape = fabric.Circle;
        shapeSpec = {                 // set up properties for the current shape outside of the function
                        radius: 1,
                        strokeWidth: 5,
                        stroke: 'red',
                        selectable: false,
                        fill: "",
                        originX: 'center',
                        originY: 'center'
                    }
        // don't like this, but it works for now, keeping track of Mouse status outside
        // of the event handlers will make it easier to use timeouts, but it feels dirty

        returnCanvas = {};

        (function () {
            var $ = function (id) {
                return document.getElementById(id)
            };

            var canvas = this.__canvas = new fabric.Canvas('annotation_canvas', {
                isDrawingMode: true
            });

            canvas.setBackgroundImage(path, canvas.renderAll.bind(canvas));

            var drawingModeEl = $('drawing-mode'),
                drawingOptionsEl = $('drawing-mode-options'),
                drawingColorEl = $('drawing-color'),
                drawingShadowColorEl = $('drawing-shadow-color'),
                drawingLineWidthEl = $('drawing-line-width'),
                drawingShadowWidth = $('drawing-shadow-width'),
                drawingShadowOffset = $('drawing-shadow-offset'),
                clearEl = $('clear-canvas'),
                imageJSONEl = $('image-to-json');

            clearEl.onclick = function () {
                canvas.clear()
            };

            // let's see if we can make a toolbar selector to pick circles and rectangles
            
            $('shape-mode-selector').onchange = function() {

                // for now, sloppily make instructions for what the drawing handlers should do

                if (this.value == "Circle") {
                    currentShape = fabric.Circle;
                    shapeSpec = {
                        radius: 1,
                        strokeWidth: 5,
                        stroke: 'red',
                        selectable: false,
                        fill: "",
                        originX: 'center',
                        originY: 'center'
                    }
                }
                else if (this.value == "Rectangle") {
                    currentShape = fabric.Rect;
                    shapeSpec = {                 // set up properties for the current shape outside of the function
                        height: 1,
                        width: 1,
                        strokeWidth: 5,
                        stroke: 'red',
                        selectable: false,
                        fill: "",
                        originX: 'center',
                        originY: 'center'
                    }
                }
                else {
                    // do nothing, not possible yet
                    console.log("How did I get here?");
                }
            }
            /* 

            don't need this right now, this functionality should be handled by the toolbar current selection

            drawingModeEl.onclick = function () {
                canvas.isDrawingMode = !canvas.isDrawingMode;
                if (canvas.isDrawingMode) {
                    drawingModeEl.innerHTML = 'Cancel drawing mode';
                    drawingOptionsEl.style.display = '';
                }
                else {
                    drawingModeEl.innerHTML = 'Enter drawing mode';
                    drawingOptionsEl.style.display = 'none';
                }
            };
            */
            imageJSONEl.onclick = function () {

                // convert canvas to a json string

                var json = JSON.stringify(canvas.toJSON());

                console.log(json);

            };

            if (fabric.PatternBrush) {
                var vLinePatternBrush = new fabric.PatternBrush(canvas);
                vLinePatternBrush.getPatternSrc = function () {

                    var patternCanvas = fabric.document.createElement('canvas');
                    patternCanvas.width = patternCanvas.height = 10;
                    var ctx = patternCanvas.getContext('2d');

                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(0, 5);
                    ctx.lineTo(10, 5);
                    ctx.closePath();
                    ctx.stroke();

                    return patternCanvas;
                };

                var hLinePatternBrush = new fabric.PatternBrush(canvas);
                hLinePatternBrush.getPatternSrc = function () {

                    var patternCanvas = fabric.document.createElement('canvas');
                    patternCanvas.width = patternCanvas.height = 10;
                    var ctx = patternCanvas.getContext('2d');

                    ctx.strokeStyle = this.color;
                    ctx.lineWidth = 5;
                    ctx.beginPath();
                    ctx.moveTo(5, 0);
                    ctx.lineTo(5, 10);
                    ctx.closePath();
                    ctx.stroke();

                    return patternCanvas;
                };

                var squarePatternBrush = new fabric.PatternBrush(canvas);
                squarePatternBrush.getPatternSrc = function () {

                    var squareWidth = 10,
                        squareDistance = 2;

                    var patternCanvas = fabric.document.createElement('canvas');
                    patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
                    var ctx = patternCanvas.getContext('2d');

                    ctx.fillStyle = this.color;
                    ctx.fillRect(0, 0, squareWidth, squareWidth);

                    return patternCanvas;
                };

                var diamondPatternBrush = new fabric.PatternBrush(canvas);
                diamondPatternBrush.getPatternSrc = function () {

                    var squareWidth = 10,
                        squareDistance = 5;
                    var patternCanvas = fabric.document.createElement('canvas');
                    var rect = new fabric.Rect({
                        width: squareWidth,
                        height: squareWidth,
                        angle: 45,
                        fill: this.color
                    });

                    var canvasWidth = rect.getBoundingRectWidth();

                    patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
                    rect.set({
                        left: canvasWidth / 2,
                        top: canvasWidth / 2
                    });

                    var ctx = patternCanvas.getContext('2d');
                    rect.render(ctx);

                    return patternCanvas;
                };

                var img = new Image();
                img.src = 'http://www.entropiaplanets.com/w/images/c/cd/Warning_sign.png';
                // was ../assets/honey_im_subtle.png
                var texturePatternBrush = new fabric.PatternBrush(canvas);
                texturePatternBrush.source = img;
            }

            $('drawing-mode-selector').onchange = function () {

                // drawing mode selection for this example is only expecting one tool
                // 'freeDrawingBrush', however we will need to switch back and forth between arbitrary
                // tools and cannot use this as the top-level indicator of which tool is selected
                // perhaps new methods that get/set current tool will be useful for later even handlers

                if (this.value === 'hline') {
                    canvas.freeDrawingBrush = vLinePatternBrush;
                }
                else if (this.value === 'vline') {
                    canvas.freeDrawingBrush = hLinePatternBrush;
                }
                else if (this.value === 'square') {
                    canvas.freeDrawingBrush = squarePatternBrush;
                }
                else if (this.value === 'diamond') {
                    canvas.freeDrawingBrush = diamondPatternBrush;
                }
                else if (this.value === 'texture') {
                    canvas.freeDrawingBrush = texturePatternBrush;
                }
                else {
                    canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
                }

                if (canvas.freeDrawingBrush) {
                    canvas.freeDrawingBrush.color = drawingColorEl.value;
                    canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                    canvas.freeDrawingBrush.shadowBlur = parseInt(drawingShadowWidth.value, 10) || 0;
                }
            };

            drawingColorEl.onchange = function () {
                canvas.freeDrawingBrush.color = this.value;
            };
            drawingShadowColorEl.onchange = function () {
                canvas.freeDrawingBrush.shadowColor = this.value;
            };
            drawingLineWidthEl.onchange = function () {
                canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
                this.previousSibling.innerHTML = this.value;
            };
            drawingShadowWidth.onchange = function () {
                canvas.freeDrawingBrush.shadowBlur = parseInt(this.value, 10) || 0;
                this.previousSibling.innerHTML = this.value;
            };
            drawingShadowOffset.onchange = function () {
                canvas.freeDrawingBrush.shadowOffsetX =
                    canvas.freeDrawingBrush.shadowOffsetY = parseInt(this.value, 10) || 0;
                this.previousSibling.innerHTML = this.value;
            };

            if (canvas.freeDrawingBrush) {
                canvas.freeDrawingBrush.color = drawingColorEl.value;
                canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
                canvas.freeDrawingBrush.shadowBlur = 0;
            }

            /*
                Here's where we try to draw a circle. This is cheating somewhat since we never selected it with
                the toolbar, but it's a start.  Later the toolbar needs to enable the events, or we have an event handler
                that selects a function based on the currently selected tool
            */

            var shapeStart = function(o){
                var pointer;
                // This is probably not the best place to do this, but...
                // Turn Off Free Drawing Mode
                canvas.isDrawingMode = false;
                pointer = canvas.getPointer(o.e);
                origX = pointer.x;
                origY = pointer.y;

                /*
                    here is where general code needs to select the shape type and
                    parameters from the toolbar state
                    this will run only when a new shape is starting
                */
                shapeSpec.left = pointer.x;
                shapeSpec.top = pointer.y;
                shape = new currentShape(shapeSpec);

                // shape is defaulting to a circle (as currently defined by above test.currentShape)

                canvas.add(shape);
            }
            var shapeDraw = function(o) {
                if (!mouseDown) return;
                var pointer = canvas.getPointer(o.e);
                shape.set(
                    {
                        /*
                            these shape parameters will be specific to current tool selection
                            this code updates the size based on displacement from the click origin
                            a different sort of function will be necessary to create this spec
                            since most objects will have different ways of controlling their size
                        */

                        radius: Math.abs(origX - pointer.x)
                    });

                canvas.renderAll();
            }

            /* 
                These above functions do very specific circle-drawing stuff, but
                general functionality will be preferred.  Currently they exist
                separately from the event handlers because the events need to have
                different behavior for different tasks
            */

            canvas.on('mouse:down', function(o){
                // select appropriate function based on selected tool
                // we need some var in the scope to keep track of 'active tool selection'
                // the value of this var will point to the function that should be passed to the event handlers
                // should the function be passed in directly or define another function that handles the
                // specialized event handling... if the latter, then the mouse event should control the
                // mouseDown variable exclusively to ensure no weird condition overlap
                mouseDown = true;
                shapeStart(o);
            });

            canvas.on('mouse:move', function(o){
                // do the circle drawing action for now
                shapeDraw(o);
            });

            canvas.on('mouse:up', function(o){
                // this is all that is needed here right now, eventually
                // the timeout function can handle comment posting
                mouseDown = false;
            });

            returnCanvas = canvas

        })();


        (function () {
            fabric.util.addListener(fabric.window, 'load', function () {
                var canvas = this.__canvas || this.canvas,
                    canvases = this.__canvases || this.canvases;

                canvas && canvas.calcOffset && canvas.calcOffset();

                if (canvases && canvases.length) {
                    for (var i = 0, len = canvases.length; i < len; i++) {
                        canvases[i].calcOffset();
                    }
                }
            });
        })();
        ;
      return {
        canvas: returnCanvas
      };
    }
  };
});
