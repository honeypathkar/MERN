const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    let { name, username, email, age, password } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(400).send("User already exists");
    }

    // Generate salt and hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error("Error generating salt:", err);
        return res.status(500).send("Internal server error");
      }

      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
          return res.status(500).send("Internal server error");
        }

        // Create user
        try {
          let newUser = await userModel.create({
            name,
            username,
            age,
            email,
            password: hash,
          });

          // Generate token and set cookie
          let token = jwt.sign({ email: email, userid: newUser._id }, "shonty");
          res.cookie("token", token);
          res.send("Registered Successfully");
        } catch (dbError) {
          console.error("Database error:", dbError);
          res.status(500).send("Error creating user");
        }
      });
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).send("Internal server error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).send("Internal server error");
      }

      if (result) {
        let token = jwt.sign({ email: email, userid: user._id }, "shonty");
        res.cookie("token", token);
        return res.status(200).redirect("/profile");
      } else {
        return res.status(401).send("Invalid email or password");
      }
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).send("Internal server error");
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  console.log(user);
  res.render("profile", { user }); // Render the profile page with user data
});

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;
  console.log("Token received:", token);

  if (!token) {
    console.log("No token provided");
    return res.redirect("/login");
  }

  try {
    const data = jwt.verify(token, "shonty");
    req.user = data;
    next();
  } catch (err) {
    console.error("Error verifying token:", err.message);
    res.redirect("/login");
  }
}

app.listen(3000, () => console.log("Port running on localhost:3000"));
