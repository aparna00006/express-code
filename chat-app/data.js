const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/login", (req, res, next) => {
  res.send(
    '<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/info" on  method="POST"><input type="text" name="username" id="username" placeholder="Username"><button type="submit">Login</button></form>'
  );
});

app.post("/info", (req, res, next) => {
  const { username } = req.body;
  console.log(username);
  res.redirect("/");
});

app.get("/", (req, res, next) => {
  fs.readFile("chatapp.txt", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat exists";
    }
    res.send(
      `${data}<form action="/" onsubmit="document.getElementById(\'username\').value=localStorage.getItem(\'username\')" method="POST"><input type="text" name="message" id="message"><input type="hidden" name="username" id="username"><button type="submit">Send</button></form>`
    );
  });
});

app.post("/", (req, res, next) => {
  const username = req.body.username
  // console.log(username);
  const message = req.body.message
  console.log(message);
  console.log(`{${username}:${message}}`);
  fs.writeFileSync(
    "chatapp.txt",
    `${req.body.username} : ${req.body.message}`,
    { flag: "a" }
  );
  res.redirect("/");
});

app.listen(3000);