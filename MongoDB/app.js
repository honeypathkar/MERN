//CRUD Operation

const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    name: "Harsh Pathkar",
    userName: "harshpathkar",
    email: "harsh@gmail.com",
  });

  res.send(createdUser);
});

app.get("/read", async (req, res) => {
  let users = await userModel.find();
  res.send(users);
});

app.get("/update", async (req, res) => {
  let updatedUser = await userModel.findOneAndUpdate(
    { userName: "honeypathkar" },
    { userName: "honeypathkar70" },
    { new: true }
  );

  res.send(updatedUser);
});

app.get("/delete", async (req, res) => {
  let deletedUser = await userModel.findOneAndDelete({
    userName: "honeypathkar70",
  });

  res.send(deletedUser);
});

app.listen(3000);
