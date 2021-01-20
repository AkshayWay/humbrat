const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "humbrat.co.in",
  //port: 3306,
  // path: "/phpmyadmin",
  user: "admin_user1",
  password: "Humbrat_User1",
  database: "admin_db_gp_humbrat",
  multipleStatements: true,
});

//local machine
// var mysqlConnection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "112014Akshay",
//   database: "db_gp_humbrat",
//   multipleStatements: true,
// });

//dev env
// var mysqlConnection = mysql.createConnection({
//   host: "dev.humbrat.co.in",
//   user: "humbrhwo_user1",
//   password: "Humbrat_User1",
//   database: "humbrhwo_dev_db_gp_humbrat",
//   multipleStatements: true,
// });

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected!");
  } else {
    console.log("Connection Failed", err);
  }
});

module.exports = mysqlConnection;
