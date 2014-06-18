em =
    unit: {}

http = require 'http'
fs = require 'fs'
path = require 'path'

requestHandler =
(req, res) ->
    fileName = path.normalize(req.url)

    fileName = if fileName is '/' then '/index.html' else fileName

    localFolder = __dirname

    content = localFolder + fileName

    fs.readFile content, (err,contents) ->
        if !err
            res.end contents
        else
            console.dir err
        em.unit

    em.unit


http.createServer requestHandler
    .listen 8124
