const fs = require("fs");

/* fs.writeFile("read.txt" , "Hello", (err) => {
    console.log("File created SuccessFully")
}) */

/* fs.appendFile("read.txt", "What's Up :)", (err) => {
  console.log("File Updated");
}); */
fs.readFile("read.txt", "utf-8", (err, data) => {
  console.log(data);
});

// console.log(data);
