let IP = "127.0.0.1";
let port = 8888;
let http = require("http");
let fs = require("fs");
let url = require("url");
let server = http.createServer();
server.on("request", function(req, res) {
  let path = url.parse(req.url, true).pathname;
  if (/\.css$/.test(path)) {
    fs.readFile(__dirname + path, "utf8", (err, data) => {
      if (err) {
        displayErrorPage();
      } else {
        res.writeHead(200, {
          "Content-Type": "text/css"
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  } else if (/\.js$/.test(path)) {
    fs.readFile(__dirname + path, "utf8", (err, data) => {
      if (err) {
        displayErrorPage();
      } else {
        res.writeHead(200, {
          "Content-Type": "application/javascript"
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  } else if (/\.(?:png)|(?:jpe?g)$/.test(path)) {
    fs.readFile(__dirname + path, "utf8", (err, data) => {
      if (err) {
        displayErrorPage();
      } else {
        res.writeHead(200, {
          "Content-Type": `image/${/\.(?:png)|(?:jpe?g)$/.match(path)[0]}`
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  } else if (/\.(?:tff)|(?:woff)$/.test(path)) {
    fs.readFile(__dirname + path, "utf8", (err, data) => {
      if (err) {
        displayErrorPage();
      } else {
        res.writeHead(200, {
          "Content-Type": `application/font-woff2;q=1.0`
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  } else if (path === "/") {
    fs.readFile(`${__dirname}/index.html`, "utf8", (err, data) => {
      if (err) {
        displayErrorPage();
      } else {
        res.writeHead(200, {
          "Content-Type": "text/html"
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  } else {
    displayErrorPage();
  }
  function displayErrorPage() {
    fs.readFile(`${__dirname}/html/404.html`, "utf8", (err, data) => {
      if (err) {
        console.log("Cannot find 404 error page!");
      } else {
        res.writeHead(404, {
          "Content-Type": "text/html"
        });
        res.write(data, "utf8");
        res.end();
      }
    });
  }
});
server.listen(port, IP);
console.log("listening to http://" + IP + ":" + port);
