const fs = require("fs");

const bioData = {
  name: "Honey",
  age: 20,
  DOB: "23/01/2004",
};

const jsonData = JSON.stringify(bioData);

// fs.writeFile("jsonData.json", jsonData, (err) => {
//   console.log("File Created");
// });

fs.readFile("jsonData.json", "utf-8", (err, data) => {
  console.log(JSON.parse(data));
});

// console.log(jsonData);
