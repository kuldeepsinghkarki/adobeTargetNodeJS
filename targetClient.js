var targetClient = require("./utils/targetUtils.js")
var express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
var psController = require("./controllers/ps-controllers.js");

const URLencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();

app.use("/", psController.router);
app.listen(3001, () => {
  console.log("Started walgreens service at port number 3001");
});
