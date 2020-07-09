const express = require("express");
const path = require("path");
const app = express();
const loginRouter = require("./Routers/loginRouter");
const assignmentRouter = require("./routers/assignmentRouter");
const videosRouter = require("./routers/videosRouter");
const port = 3000;
const host = "127.0.0.1";
var bodyParser = require("body-parser");
// app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/login", loginRouter);
app.use("/assignment", assignmentRouter);
app.use("/videos", videosRouter);
app.listen(port, host, (req, res) => {
  console.log("Listening to Port : " + port);
});
