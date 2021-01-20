const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const hostname = "93.188.167.238";

//const port = process.env.port || 4500;
//working code
//const port = process.env.port || 8080;
//working code
//const port = process.env.port || 3306;
const port = process.env.port || 60000;

const mySqlConnection = require("./db_connection");
const Gp_Humbrat_Route = require("./routes/gp_humbrat_routing");
var cors = require("cors");

var app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/feature", express.static("feature"));
app.use("/work", express.static("work"));
app.use("/elected_person", express.static("elected_person"));
app.use("/employees", express.static("employees"));
app.use("/trash", express.static("trash"));
app.use(bodyParser.json());
app.use("/humbrat", Gp_Humbrat_Route);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/", (req, res) => {
//   // res.sendFile(path.join(appRoot, "../build/index.html"));
//   //res.sendFile(path.join(appRoot, "build", "index.html"));
//   res.sendFile(path.join(__dirname, "build/index.html"));
// });

app.use(express.static(path.join(__dirname, "/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

http.createServer(app).listen(port, hostname, function () {
  console.log(
    "Application running on port number " + port + " And host on " + hostname
  );
});
