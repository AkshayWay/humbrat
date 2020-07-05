const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");

Router.get("/news_panel", (req, res) => {
  mySqlConnection.query("select * from tbl_news_panel", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log("Error :" + err);
    }
  });
});
module.exports = Router;
