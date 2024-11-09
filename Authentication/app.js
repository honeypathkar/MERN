const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cookieParser());

app.get("/", (req, res) => {
  //   res.cookie("name", "Honey");
  /*   bcrypt.compare(
    "Honey7976&",
    "$2b$10$.ESVWvG5Ggvy5bwqOaeJOOnR5.LnoXZeUza45zbYdaRLWogumiv66",
    function (err, result) {
      console.log(result);
    }
  ); */
  let token = jwt.sign({ email: "honeypatkar70@gmail.com" }, "secret");
  res.cookie("token", token);
  console.log(token);
  res.send("Hello world");
});

app.get("/read", (req, res) => {
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
  res.send("Read Page");
});

app.listen(3000);
console.log("Port running on localhost:3000");
