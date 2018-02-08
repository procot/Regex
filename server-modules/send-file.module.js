const zlib = require('zlib'),
      fs = require('fs'),
      mime = require('mime');
      path = require('path');
      url = require('url');

module.exports = function (pathname, res) {
  pathname = `.${pathname}`;
  fs.exists(pathname, exist => {
    if (!exist) {
      res.statusCode = 404;
      res.end('Error missing file');
      return;
    }

    if (fs.statSync(pathname).isDirectory()) {
      pathname += 'index/index.html';
    }

    let file = fs.createReadStream(pathname);
    file.on('open', () => {
      const gzip = zlib.createGzip();
      const type = mime.getType(pathname);
      console.log("\x1b[32m%s\x1b[0m", "GET file: " + pathname);

      res.setHeader('Content-Type', `${type}; charset=utf-8`);
      res.setHeader('Content-Encoding', 'gzip'); 
      res.statusCode = 200;
      file.pipe(gzip).pipe(res);
    });

    file.on("error", function(err) {
      console.error("\x1b[31m%s\x1b[0m", err);
      res.statusCode = 403;
      res.write('file permission');
      res.end();
    });
  });
}