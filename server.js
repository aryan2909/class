const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));  

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});w

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

server.listen(3000, () => {
  console.log("server started at port 3000");
});
