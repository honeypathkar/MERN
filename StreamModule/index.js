const fs = require("fs");
const http = require("http");

const server = http.createServer();
//   res.end("Home Page");
// });

server.on("request", (req, res) => {
  //   fs.readFile("input.txt", (err, data) => {
  //     if (err) return console.error(err);
  //     res.end(data.toString());
  //   });

  //   const rStream = fs.createReadStream("input.txt");

  //   rStream.on("data", (chuckData) => {
  //     res.write(chuckData);
  //   });

  //   rStream.on("end", () => {
  //     res.end();
  //   });

  //   rStream.on("error", (err) => {
  //     console.log(err);
  //     res.end("File not found")
  //   })

  const rStream = fs.createReadStream("input.txt");
  rStream.pipe(res);
});

server.listen(7000, "localhost", () => {
  console.log("listening to port no. 7000");
});
