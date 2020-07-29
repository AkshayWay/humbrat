const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");
//Multer for file upload
const multer = require("multer");
//const img=require("../uploads")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Message: Wrong file type"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

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
Router.post("/dashboard_banner", upload.single("bannerImg"), (req, res) => {
  console.log(req.file);
  let newBanner = req.file;
  //console.log("Data ", req.body);
  var sqlQuery =
    "SET @tbl_banner_title=?; SET @tbl_banner_src=?;SET @tbl_banner_is_active=?;" +
    "SET @tbl_banner_is_deleted=?; CALL sp_new_dashboard_banner(@tbl_banner_title,@tbl_banner_src," +
    "@tbl_banner_is_active, @tbl_banner_is_deleted)";

  mySqlConnection.query(
    sqlQuery,
    [newBanner.originalname, newBanner.path, 1, 0],
    (err, rows) => {
      if (!err) {
        // res.send(rows);
        console.log(rows);
        res.status(201).json({
          message: "Created product successfully",
          createdImage: {
            id: rows.tbl_banner_id,
            name: rows.tbl_banner_title,
            src: rows.tbl_banner_src,
            isActive: rows.tbl_banner_is_active,
            isDeleted: rows.tbl_banner_is_deleted,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + rows._id,
            },
          },
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Adding banner end
module.exports = Router;
