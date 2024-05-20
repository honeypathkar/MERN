const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Hello ! How are you ?");
});

server.listen(8000, "localhost", () => {
  console.log("Listening to port 8000");
});
