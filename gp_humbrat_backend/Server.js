const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const port = process.env.port || 4500;
const mySqlConnection = require("./db_connection");
const Gp_Humbrat_Route = require("./routes/gp_humbrat_routing");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/humbrat", Gp_Humbrat_Route);

app.listen(port, function () {
  console.log("Application running on port number " + port);
});