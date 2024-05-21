const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const data = fs.readFileSync(`${__dirname}/UserApi/userapi.json`, "utf-8");
  const obj = JSON.parse(data);
  if (req.url == "/") {
    res.end("Home Page");
  } else if (req.url == "/about") {
    res.end("About Page");
  } else if (req.url == "/contact") {
    res.end("Contact Page");
  } else if (req.url == "/userapi") {
    res.writeHead(200);
    res.end(obj[0].title);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end("<h1>404 Page Not Found</h1>");
  }
});

server.listen(8000, "localhost", () => {
  console.log("Listening to port 8000");
});
