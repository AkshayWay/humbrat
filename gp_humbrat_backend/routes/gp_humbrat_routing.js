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
Router.get("/news_panel/:id", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_news_panel where tbl_news_id=?",
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
Router.post("/news_panel/addEdit/:id", (req, res) => {
  let newsObj = req.body;
  console.log(newsObj.tbl_news_id);
  console.log(newsObj.tbl_news_title);
  console.log(newsObj.tbl_news_desciption);
  console.log(newsObj.tbl_news_is_active);
  var sqlQuery =
    "SET @tbl_news_id=?; SET @tbl_news_title=?; SET @tbl_news_desciption=?; " +
    "SET @tbl_news_is_active=?;" +
    "CALL sp_newsAddUpdate(@tbl_news_id,@tbl_news_title,@tbl_news_desciption,@tbl_news_is_active);";
  mySqlConnection.query(
    sqlQuery,
    [
      newsObj.tbl_news_id,
      newsObj.tbl_news_title,
      newsObj.tbl_news_desciption,
      newsObj.tbl_news_is_active,
    ],
    (err, rows) => {
      if (!err) {
        res.send(rows);
        console.log(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
module.exports = Router;
