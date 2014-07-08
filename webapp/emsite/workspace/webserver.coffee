# this webserver is a hybrid of the "old" one and the socket.io chat tutorial
# the two are rather different methods of creating the server so who knows if I did right

em = unit: {}

# express = require('express')()

http = require('http') # .Server express

fs = require 'fs'

path = require 'path'

requestHandler = (request, response) ->
	fileName = path.normalize request.url
	regex = /(\.css)|(\.js)|(\.tpl\.html)|(\.jpg)|(\.png)/
	fileName = if regex.test(fileName) then fileName else '/index.html'
	localFolder = __dirname
	content = localFolder + fileName
	fs.readFile content, (err, contents) ->
		if not err then response.end contents else console.dir err
		em.unit
	em.unit

http = http.createServer requestHandler

io = require('socket.io') http

# fabric = require 'fabric' # so we can listen for fabric JSON - fails due to node_module not present, errors on compile

# express.get '/#/', (req, res) ->
#   res.sendfile 'index.html'
#   em.unit

io.on 'connection', (socket) ->
	# this function catches the emit of 'test socket' from the annotation details controller
  	socket.on 'test socket', (msg) ->
    	console.log "message: #{msg}"
    	em.unit
    em.unit

http.listen 3000, () ->
  console.log 'listening on *:3000'
  em.unit


# # new stuff for possible node-fabric synergy with JSON
# # 	canvas = fabric.createCanvasForNode 800, 600
# # 	response.writeHead 200, 'Content-Type': 'image/png'

# # 	canvas.loadFromJSON params.query.data, () ->
# # 		canvas.renderAll()

# # 		stream = canvas.createPNGStream()
# # 		stream.on 'data', (chunk) ->
# # 			response.write chunk
# # 		stream.on 'end', () ->
# # 			response.end()
# # 		em.unit
# http.createServer(requestHandler).listen 8124