const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Home Page");
});

app.get("/about", function (req, res, next) {
  res.send("About Page");
  // return next(new Error("something wrong"));
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(400).send("404 Page Not Found");
// });

app.listen(3000, () => {
  console.log("Listening to Port NO. 3000");
});
