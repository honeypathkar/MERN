const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile/:username", (req, res) => {
  res.send(`Welcome ${req.params.username}`);
});

app.get("/author/:author/:age", (req, res) => {
  res.send(`Author Name : ${req.params.author} and Age ${req.params.age}`);
});

app.listen(3000, () => {
  console.log("Listening to port no. 3000");
});
