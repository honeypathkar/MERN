const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Honey",
    email: "honeypatkar70@gmail.com",
    age: 20,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postData: "This is my First Post",
    user: "6731b42df62a05377a09b989",
  });

  let user = await userModel.findOne({ _id: "6731b42df62a05377a09b989" });
  user.posts.push(post._id);
  await user.save();

  res.send({ post, user });
});

app.listen(3000);
console.log("Port running on localhost:3000");
