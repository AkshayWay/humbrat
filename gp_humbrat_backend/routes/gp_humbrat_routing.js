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

//Work images with multiple files
const storage_post = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./work/");
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
const fileFilter_work = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Message: Wrong file type"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
const upload_work = multer({
  storage: storage_post,
  fileFilter: fileFilter_work,
});

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
  //console.log(req.body.imageDesciption);
  let newBanner = req.file;
  // let bannerDesc = req.file.bannerImgDesc;
  // console.log(req.body.abc);
  //console.log("Data ", req.body);
  var sqlQuery =
    "SET @tbl_banner_title=?; SET @tbl_banner_src=?;SET @tbl_banner_is_active=?;" +
    "SET @tbl_banner_is_deleted=?;SET @tbl_banner_img_desc=?;" +
    "CALL sp_new_dashboard_banner(@tbl_banner_title,@tbl_banner_src," +
    "@tbl_banner_is_active, @tbl_banner_is_deleted, @tbl_banner_img_desc)";

  mySqlConnection.query(
    sqlQuery,
    [newBanner.filename, newBanner.path, 1, 0, req.body.imageDesciption],
    (err, rows) => {
      if (!err) {
        // res.send(rows);
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
//Add images and their description for post
Router.post(
  "/work_details",
  upload_work.array("workImages", 10),
  (req, res) => {
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(req.files[i].filename);
    }
    //console.log("Work date", req.body.workDate);

    var sqlQuery =
      "SET @tbl_work_id=?; SET @tbl_work_title=?; SET @tbl_work_details=?;SET @tbl_work_is_deleted=?;" +
      "SET @tbl_work_images_title=?; SET @tbl_work_date=?; CALL sp_work_add_edit(@tbl_work_id,@tbl_work_title," +
      "@tbl_work_details,@tbl_work_is_deleted,@tbl_work_images_title, @tbl_work_date)";

    mySqlConnection.query(
      sqlQuery,
      [
        0,
        req.body.workTitle,
        req.body.imageDesciption,
        0,
        reqFiles.toString(),
        req.body.workDate,
      ],
      (err, rows) => {
        if (!err) {
          // res.send(rows);
          res.status(201).json({
            message: "Created post successfully",
          });
        } else {
          console.log("Error :" + err);
        }
      }
    );
  }
);
//Add images and their description for post

//Displaying all banner image
Router.get("/dashboard_banner/all_img", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_dashboard_banner where tbl_banner_is_deleted<>1",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Display all bannner end
//Display banner on dashboard
Router.get("/dashboard_banner/getbanner", (req, res) => {
  mySqlConnection.query(
    "select tbl_banner_title,tbl_banner_img_desc from tbl_dashboard_banner where tbl_banner_is_active=1",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Display banner on dashboard end
Router.put("/dashboard_banner/edit/:id", (req, res) => {
  let newObj = req.body;
  var sqlQuery =
    "SET @tbl_banner_id=?; SET @tbl_banner_img_desc=?;SET @tbl_banner_is_active=?;" +
    "CALL sp_dashboard_banner_edit(@tbl_banner_id,@tbl_banner_img_desc," +
    "@tbl_banner_is_active)";

  mySqlConnection.query(
    sqlQuery,
    [
      newObj.tbl_banner_id,
      newObj.tbl_banner_img_desc,
      newObj.tbl_banner_is_active,
    ],
    (err, rows) => {
      if (!err) {
        //  console.log(rows);
        res.status(201).json({
          message: "Banner info updated successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//End displaying banner image
// Delete banner image
Router.put("/dashboard_banner/delete/:id", (req, res) => {
  var sqlQuery =
    "SET @tbl_banner_id=?;CALL sp_dashboard_banner_delete(@tbl_banner_id)";
  mySqlConnection.query(sqlQuery, [req.params.id], (err, rows) => {
    if (!err) {
      //  console.log(rows);
      res.status(201).json({
        message: "Banner info deleted successfully",
      });
    } else {
      console.log("Error :" + err);
    }
  });
});
//Delete banner image end
//Add or edit running instructions
Router.post("/instructions", (req, res) => {
  let newObj = req.body;
  var sqlQuery =
    "SET @tbl_instructions_id=?;SET @tbl_instructions_msg=?;SET @tbl_instructions_is_active=?;" +
    "SET @tbl_instructions_is_delete=?;CALL sp_instructions_add_edit(@tbl_instructions_id,@tbl_instructions_msg," +
    "@tbl_instructions_is_active,@tbl_instructions_is_delete) ";
  mySqlConnection.query(
    sqlQuery,
    [
      newObj.tbl_instructions_id,
      newObj.tbl_instructions_msg,
      newObj.tbl_instructions_is_active,
      newObj.tbl_instructions_is_delete,
    ],
    (err, rows) => {
      if (!err) {
        //res.send(rows);
        res.status(201).json({
          message: "Instuctions added/updated successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Add or edit running instructions end
//Get all instructions
Router.get("/instructions", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_instructions where tbl_instructions_is_delete<>1",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Get all instructions end
//Get data of selected instruction
Router.get("/instructions/:id", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_instructions where tbl_instructions_id=?",
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
//Get data of selected instruction end
//Delete instruction
Router.put("/instructions/delete/:id", (req, res) => {
  var sqlQuery =
    "SET @tbl_instructions_id=?;CALL sp_delete_instruction(@tbl_instructions_id)";
  mySqlConnection.query(sqlQuery, [req.params.id], (err, rows) => {
    if (!err) {
      res.status(201).json({
        message: "Instruction info deleted successfully",
      });
    } else {
      console.log("Error :" + err);
    }
  });
});
//Delete instruction end
//Instruction at home page
Router.get("/get_instructions", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_instructions where tbl_instructions_is_active=1",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Instruction at home page end
//Thumbnil to work post
Router.get("/work_thumbnails", (req, res) => {
  mySqlConnection.query(
    "select tbl_work_id, tbl_work_title,tbl_work_date,tbl_work_details,(SELECT SUBSTRING_INDEX(tbl_work_images_title, ',', 1) )AS tbl_work_images_title  from tbl_work",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Thumbnil to work post end
//Get details for work
Router.get("/WorkDetails/:id", (req, res) => {
  mySqlConnection.query(
    //"select * from tbl_work where tbl_work_id=?",
    "select * from tbl_work where tbl_work_id=?",
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
//Get details for work end
//Update or delete work post
Router.put("/WorkDetails/add_edit/:id", (req, res) => {
  var sqlQuery =
    "SET @tbl_work_id=?; SET @tbl_work_title=?; SET @tbl_work_details=?;" +
    "SET @tbl_work_images_title=?;SET @tbl_work_date=? ;CALL sp_work_add_edit(@tbl_work_id,@tbl_work_title," +
    "@tbl_work_details,@tbl_work_images_title, @tbl_work_date)";
  mySqlConnection.query(
    sqlQuery,
    [
      req.body.tbl_work_id,
      req.body.tbl_work_title,
      req.body.tbl_work_details,
      "",
      req.body.tbl_work_date,
    ],
    (err, rows) => {
      if (!err) {
        //  console.log(rows);
        res.status(201).json({
          message: "Work post info Updated/Deleted successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Update or delete work post end

module.exports = Router;
