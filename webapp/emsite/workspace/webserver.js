var em, fs, http, path, fabric, requestHandler;

em = {
  unit: {}
};

http = require('http');

fs = require('fs');

path = require('path');

// fabric = require('fabric'); // so we can listen for fabric JSON - fails due to node_module not present, errors on compile

requestHandler = function(request, response) {
  var content, fileName, localFolder, regex;
  fileName = path.normalize(request.url);
  regex = /(\.css)|(\.js)|(\.tpl\.html)|(\.jpg)|(\.png)/;
  fileName = regex.test(fileName) ? fileName : '/index.html';
  localFolder = __dirname;
  content = localFolder + fileName;
  fs.readFile(content, function(err, contents) {
    if (!err) {
      response.end(contents);
    } else {
      console.dir(err);
    }
    return em.unit;
  });
  return em.unit;
  /*
  // new stuff for possible node-fabric synergy with JSON
  var canvas = fabric.createCanvasForNode(800, 600);
  response.writeHead(200, { 'Content-Type': 'image/png' });

  canvas.loadFromJSON(params.query.data, function() {
    canvas.renderAll();

    var stream = canvas.createPNGStream();
    stream.on('data', function(chunk) {
      response.write(chunk);
    });

    stream.on('end', function() {
      response.end();
    });
    return em.unit;
  });
  */
};
http.createServer(requestHandler).listen(8124);

