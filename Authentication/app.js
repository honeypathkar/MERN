const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cookieParser());
const path = require("path");
const userModel = require("./models/user");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/create", (req, res) => {
  let { username, email, password, age } = req.body;

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });
      let token = jwt.sign({ email }, "shonty");
      res.cookie("token", token);
      res.send(createdUser);
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("Something Went Wrong");
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    // console.log(result);

    if (result) {
      let token = jwt.sign({ email: user.email }, "shonty");
      res.cookie("token", token);
      res.send("You can Login");
    } else res.send("Something Went Wrong");
  });
  //   console.log(user);
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

app.listen(3000);
console.log("Port running on localhost:3000");

//Part 1
/* app.get("/", (req, res) => {
    //   res.cookie("name", "Honey");
      bcrypt.compare(
      "Honey7976&",
      "$2b$10$.ESVWvG5Ggvy5bwqOaeJOOnR5.LnoXZeUza45zbYdaRLWogumiv66",
      function (err, result) {
        console.log(result);
      }
    );
    let token = jwt.sign({ email: "honeypatkar70@gmail.com" }, "secret");
    res.cookie("token", token);
    console.log(token);
    res.send("Hello world");
  });
  
  app.get("/read", (req, res) => {
    let data = jwt.verify(req.cookies.token, "secret");
    console.log(data);
    res.send("Read Page");
  }); */
