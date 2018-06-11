const zlib = require('zlib'),
      fs = require('fs'),
      mime = require('mime'),
      path = require('path'),
      url = require('url'),
      log = require('./console-log.module');

module.exports = function (pathname, res) {
  let pathFull = `${__dirname}/../.${pathname}`;
  pathname = `.${pathname}`;
  fs.exists(pathFull, exist => {
    if (!exist) {
      res.statusCode = 404;
      res.end('Error missing file');
      log.error('Error: file isn\'t exist');
      return;
    }

    if (fs.statSync(pathFull).isDirectory()) {
      pathname += 'index/index.html';
      pathFull += 'index/index.html';
    }

    let file = fs.createReadStream(pathFull);
    file.on('open', () => {
      const gzip = zlib.createGzip();
      const type = mime.getType(pathFull);
      // console.log("\x1b[32m%s\x1b[0m", "GET file: " + pathname);
      log.succesful(`GET file: ${pathname}`);

      res.setHeader('Content-Type', `${type}; charset=utf-8`);
      res.setHeader('Content-Encoding', 'gzip'); 
      res.statusCode = 200;
      file.pipe(gzip).pipe(res);
    });

    file.on("error", function(err) {
      // console.error("\x1b[31m%s\x1b[0m", err);
      log.error('Error: file permission');
      res.statusCode = 403;
      res.write('file permission');
      res.end();
    });
  });
}