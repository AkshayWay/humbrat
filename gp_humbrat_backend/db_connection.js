const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "112014Akshay",
  database: "db_gp_humbrat",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected!");
  } else {
    console.log("Connection Failed", err);
  }
});

module.exports = mysqlConnection;
