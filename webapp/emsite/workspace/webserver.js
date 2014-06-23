var em, fs, http, path, requestHandler;

em = {
  unit: {}
};

http = require('http');

fs = require('fs');

path = require('path');

requestHandler = function(req, res) {
  var content, fileName, localFolder, regex;
  fileName = path.normalize(req.url);
  regex = /(\.css)|(\.js)|(\.tpl\.html)/;
  fileName = regex.test(fileName) ? fileName : '/index.html';
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

