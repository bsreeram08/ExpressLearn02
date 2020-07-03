const express = require("express");
const path = require("path");
const app = express();
const loginRouter = require("./Routers/loginRouter");
const port = 3000;
const host = "127.0.0.1";

//app.set("views", path.join(__dirname, "views"));
app.use("/", loginRouter);

app.listen(port, host, (req, res) => {
  console.log("Listening to Port : " + port);
});
app.post("/", (req, res) => {
  console.log(req.body);
  res.send("added");
});
