var em, fs, http, path, requestHandler;

em = {
  unit: {}
};

http = require('http');

fs = require('fs');

path = require('path');

requestHandler = function(req, res) {
  var content, fileName, localFolder;
  fileName = path.normalize(req.url);
  fileName = fileName === '/' ? '/index.html' : fileName;
  localFolder = __dirname;
  content = localFolder + fileName;
  fs.readFile(content, function(err, contents) {
    if (!err) {
      res.end(contents);
    } else {
      console.dir(err);
    }
    return em.unit;
  });
  return em.unit;
};

http.createServer(requestHandler).listen(8124);
