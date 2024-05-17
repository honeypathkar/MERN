const fs = require("fs");

// fs.writeFileSync("new.txt", "Hello");
// fs.appendFileSync("new.txt", "How are you ?");

const data = fs.readFileSync("read.txt", "utf-8");
console.log(data);
console.log("Reading File");

// fs.renameSync("new.txt", "readWrite.txt")

// fs.rm("readWrite.txt")
