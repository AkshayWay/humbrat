const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");

//News section start
Router.get("/news_panel", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_news_panel where tbl_news_is_deleted <> 1 order by tbl_news_id desc;",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
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
  var sqlQuery =
    "SET @tbl_news_id=?; SET @tbl_news_title=?; SET @tbl_news_description=?; " +
    "SET @tbl_news_is_active=?;" +
    "CALL sp_newsAddUpdate(@tbl_news_id,@tbl_news_title,@tbl_news_description,@tbl_news_is_active);";
  mySqlConnection.query(
    sqlQuery,
    [
      newsObj.tbl_news_id,
      newsObj.tbl_news_title,
      newsObj.tbl_news_description,
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
Router.post("/news_panel/delete/:id", (req, res) => {
  let deleteId = req.body;
  //console.log(req.params.id);
  var sqlQuery = "SET @tbl_news_id=?; CALL sp_deleteNewsInfo(@tbl_news_id)";
  mySqlConnection.query(sqlQuery, [req.params.id], (err, rows) => {
    if (!err) {
      // console.log("Deleted successfully");
      res.send(rows);
    } else {
      console.log("Error :" + err);
    }
  });
});
Router.get("/home/news_panel", (req, res) => {
  mySqlConnection.query(
    "select tbl_news_id,tbl_news_title, tbl_news_description, tbl_news_updated_date from tbl_news_panel where tbl_news_is_active and tbl_news_is_deleted<>1;",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
// News section end
//Adding banner to dashboard
Router.post("/dashboard_banner", (req, res) => {
  let newBanner = req.body;
  var sqlQuery =
    "SET @tbl_banner_title=?; SET @tbl_banner_src=?;SET @tbl_banner_is_active=?;" +
    "SET @tbl_banner_is_deleted=?; CALL sp_new_dashboard_banner(@tbl_banner_title,@tbl_banner_src," +
    "@tbl_banner_is_active, @tbl_banner_is_deleted)";

  mySqlConnection.query(
    sqlQuery,
    [
      newBanner.tbl_banner_title,
      newBanner.tbl_banner_src,
      newBanner.tbl_banner_is_active,
      newBanner.tbl_banner_is_deleted,
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
//Adding banner end
module.exports = Router;
