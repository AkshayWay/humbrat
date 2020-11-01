const express = require("express");
const Router = express.Router();
const mySqlConnection = require("../db_connection");
//Multer for file upload
const multer = require("multer");
//const img=require("../uploads")
const fs = require("fs");
const mysqlConnection = require("../db_connection");

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
//Upload features image
const storage_features = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./feature/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
// Upload elected person image
const storage_elected_person = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./elected_person/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});
//Upload employee
const storage_employee = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./employees/");
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
const fileFilter_feature = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Message: Wrong file type"), false);
  }
};
const fileFilter_elected_person = (req, file, cb) => {
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
const upload_featues = multer({
  storage: storage_features,
  fileFilter: fileFilter_feature,
});
const upload_elected_Person = multer({
  storage: storage_elected_person,
  fileFilter: fileFilter_elected_person,
});
const upload_employee = multer({
  storage: storage_employee,
  fileFilter: fileFilter_elected_person,
});
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
        // res.status(201).json({
        //   message: "Created dashboard successfully",
        //   createdImage: {
        //     id: rows.tbl_banner_id,
        //     name: rows.tbl_banner_title,
        //     src: rows.tbl_banner_src,
        //     isActive: rows.tbl_banner_is_active,
        //     isDeleted: rows.tbl_banner_is_deleted,
        //     request: {
        //       type: "GET",
        //       url: "http://localhost:3000/products/" + rows._id,
        //     },
        //   },
        // });
        if (!err) {
          mySqlConnection.query(
            "select tbl_banner_id,tbl_banner_title from tbl_dashboard_banner order by tbl_banner_id desc limit 1;",
            (err, rows) => {
              if (!err) {
                console.log("Id and image:" + rows);
                res.send(rows);
              } else {
                console.log("Error :" + err);
              }
            }
          );
        } else {
          console.log("Error :" + err);
        }
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Adding banner end
//Village features
Router.post(
  "/village_features",
  upload_featues.single("featureImg"),
  (req, res) => {
    var FileName = "";
    if (req.file !== undefined) {
      let newFeature = req.file;
      FileName = newFeature.filename;
    }

    var sqlQuery =
      "SET @tbl_features_id=?;SET @tbl_features_file_name=?; SET @tbl_features_title=?;SET @tbl_features_description=?;" +
      "SET @tbl_features_is_deleted=?;CALL sp_features_add(@tbl_features_id,@tbl_features_file_name,@tbl_features_title," +
      "@tbl_features_description,@tbl_features_is_deleted)";

    mySqlConnection.query(
      sqlQuery,
      [0, FileName, req.body.feature_title, req.body.feature_desc, null],
      (err, rows) => {
        if (!err) {
          mySqlConnection.query(
            "select tbl_features_id,tbl_features_file_name from tbl_features order by tbl_features_id desc limit 1;",
            (err, rows) => {
              if (!err) {
                console.log("Id and image:" + rows);
                res.send(rows);
              } else {
                console.log("Error :" + err);
              }
            }
          );
          // var featureID=
          // res.status(201).json({
          //   message: "Image:" + FileName,
          // });
        } else {
          console.log("Error :" + err);
        }
      }
    );
  }
);
//Village features end
//Elected person start
Router.post(
  "/elected_person",
  upload_elected_Person.single("electedPersonImg"),
  (req, res) => {
    var ElectedPersonImg = "";
    if (req.file !== undefined) {
      let newFeature = req.file;
      ElectedPersonImg = newFeature.filename;
    }

    var sqlQuery =
      "SET @tbl_elected_person_id=?;SET @tbl_elected_person_fullname=?; SET @tbl_elected_person_designation=?;SET @tbl_elected_person_ward=?;" +
      "SET @tbl_elected_person_contact_no=?;SET @tbl_elected_person_img=?; SET @tbl_elected_person_is_active=?;CALL sp_elected_person(@tbl_elected_person_id,@tbl_elected_person_fullname,@tbl_elected_person_designation," +
      "@tbl_elected_person_ward,@tbl_elected_person_contact_no,@tbl_elected_person_img, @tbl_elected_person_is_active)";

    mySqlConnection.query(
      sqlQuery,
      [
        req.body.tbl_elected_person_id,
        req.body.tbl_elected_person_fullname,
        req.body.tbl_elected_person_designation,
        req.body.tbl_elected_person_ward,
        req.body.tbl_elected_person_contact_no,
        ElectedPersonImg,
        1,
      ],
      (err, rows) => {
        if (!err) {
          // res.send(rows);
          res.status(201).json({
            message: "Elected Person added successfully",
          });
        } else {
          console.log("Error :" + err);
        }
      }
    );
  }
);
//Elected person end
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
      "SET @tbl_work_id=?; SET @tbl_work_title=?; SET @tbl_work_details=?;" +
      "SET @tbl_work_images_title=?; SET @tbl_work_date=?; CALL sp_work_add_edit(@tbl_work_id,@tbl_work_title," +
      "@tbl_work_details,@tbl_work_images_title, @tbl_work_date)";

    mySqlConnection.query(
      sqlQuery,
      [
        0,
        req.body.workTitle,
        req.body.imageDesciption,
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
Router.put("/dashboard_banner/delete", (req, res) => {
  console.log("Id:" + req.body.tbl_banner_id);
  console.log("Image:" + req.body.tbl_banner_title);
  var sqlQuery =
    "SET @tbl_banner_id=?;CALL sp_dashboard_banner_delete(@tbl_banner_id)";
  mySqlConnection.query(sqlQuery, [req.body.tbl_banner_id], (err, rows) => {
    if (!err) {
      const path = "./uploads/" + req.body.tbl_banner_title;
      if (fs.existsSync(path)) {
        try {
          fs.unlinkSync(path);
          res.status(201).json({
            message: "Banner info deleted successfully",
          });
        } catch (err) {
          console.error(err);
        }
      }
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
    "select tbl_work_id, tbl_work_title,tbl_work_date,tbl_work_details,(SELECT SUBSTRING_INDEX(tbl_work_images_title, ',', 1) )AS tbl_work_images_title  from tbl_work where tbl_work_is_deleted<>1",
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
//Update work post
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
//Update work post end
//Delete work post
Router.put("/WorkDetails/delete", (req, res) => {
  console.log("Body:", req.body);
  var sqlQuery =
    "Update tbl_work set tbl_work_is_deleted=1 where tbl_work_id=?";
  mySqlConnection.query(sqlQuery, [req.body.tbl_work_id], (err, rows) => {
    if (!err) {
      mysqlConnection.query(
        "Select tbl_work_images_title from tbl_work where tbl_work_id=?",
        [req.body.tbl_work_id],
        (err, rows) => {
          if (!err) {
            const workImageData = rows[0];
            var imageString = workImageData.tbl_work_images_title.toString();
            var mutipleImage = imageString.includes("world");
            if (mutipleImage == true) {
              const workArr = imageString.toString().split(",");
              for (var i = 0; i < workArr.length; i++) {
                const path = "./work/" + workArr[i];
                if (fs.existsSync(path)) {
                  try {
                    fs.unlinkSync(path);
                    res.status(201).json({
                      message: "Work post info Updated/Deleted successfully",
                    });
                  } catch (err) {
                    console.error(err);
                  }
                }
              }
            } else {
              const path = "./work/" + imageString;
              if (fs.existsSync(path)) {
                try {
                  fs.unlinkSync(path);
                  res.status(201).json({
                    message: "Work post info Updated/Deleted successfully",
                  });
                } catch (err) {
                  console.error(err);
                }
              }
            }
            // if (req.body.tbl_employee_img != "") {
          } else {
            console.log("Error :" + err);
          }
        }
      );
    }
    //   const workImageData = req.body.tbl_work_images_title;

    //   console.log("workImageData:" + workImageData);
    //   const workArr = workImageData.split(",");
    //   console.log("Work array length:" + workArr.length);
    //   // if (req.body.tbl_employee_img != "") {
    //   for (var i = 0; i < workArr.length; i++) {
    //     const path = "./employees/" + req.body.tbl_work_images_title;
    //     if (fs.existsSync(path)) {
    //       try {
    //         fs.unlinkSync(path);
    //         //file removed
    //       } catch (err) {
    //         console.error(err);
    //       }
    //     }
    //   }
    // }

    // res.status(201).json({
    //   message: "Work post deleted successfully",
    // });
    //  }
    else {
      console.log("Error :" + err);
    }
  });
});
//Delete work post end
//Check user login
Router.post("/check_user", (req, res) => {
  var user = req.body;
  // console.log("user", user);
  var sqlQuery = "SET @tbl_user_email=?; CALL sp_check_user(@tbl_user_email);";
  mySqlConnection.query(sqlQuery, [user.tbl_user_email], (err, rows) => {
    if (!err) {
      res.status(201).json({
        message: JSON.stringify(rows[1][0].User),
      });
    } else {
      console.log("Error :" + err);
    }
  });
});
//Check user login end
//Features of the villages
Router.get("/village_features", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM db_gp_humbrat.tbl_features where tbl_features_is_deleted<>1;",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Features of the village end
//Feature of the village edit
Router.put("/village_features/:id", (req, res) => {
  console.log("Feature id:" + req.body.tbl_features_id);
  var sqlQuery =
    "SET @tbl_features_id=?;SET @tbl_features_file_name=?; SET @tbl_features_title=?;SET @tbl_features_description=?;" +
    "SET @tbl_features_is_deleted=?;CALL sp_features_add(@tbl_features_id,@tbl_features_file_name,@tbl_features_title," +
    "@tbl_features_description,@tbl_features_is_deleted)";

  mySqlConnection.query(
    sqlQuery,
    [
      req.body.tbl_features_id,
      null,
      req.body.tbl_features_title,
      req.body.tbl_features_description,
      req.body.tbl_features_is_deleted,
    ],
    (err, rows) => {
      if (!err) {
        if (
          req.body.tbl_features_file_name != "" &&
          req.body.tbl_features_file_name != undefined
        ) {
          const path = "./feature/" + req.body.tbl_features_file_name;
          if (fs.existsSync(path)) {
            try {
              fs.unlinkSync(path);
            } catch (err) {
              console.error(err);
            }
          }
        }
        res.status(201).json({
          message: "Feature edited/deleted successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Feature of the village edit end
//Designations
Router.get("/designation", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_designation order by tbl_designation_id desc",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Designatons end
//Elected person list
Router.get("/elected_person_list", (req, res) => {
  mySqlConnection.query(
    "select tbl1.tbl_elected_person_id, tbl1.tbl_elected_person_fullname,tbl2.tbl_designation_name, tbl1.tbl_elected_person_ward, tbl1.tbl_elected_person_contact_no,tbl1.tbl_elected_person_img" +
      " from tbl_elected_person as tbl1" +
      " Inner Join tbl_designation as tbl2 ON" +
      " tbl1.tbl_elected_person_designation=tbl2.tbl_designation_id" +
      " where tbl1.tbl_elected_person_is_active <> 0" +
      " order by tbl2.tbl_designation_id ASC;",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Elected person list
//Elected person edit
Router.get("/elected_person_list/:id", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM tbl_elected_person where tbl_elected_person_id=?",
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
//Elected person edit
//Edit elected person
Router.put(
  "/elected_person",
  upload_elected_Person.single("electedPersonImg"),
  (req, res) => {
    var ElectedPersonImg = "No image";
    if (req.file !== undefined) {
      let newElectedPerson = req.file;
      ElectedPersonImg = newElectedPerson.filename;
    }
    var sqlQuery =
      "SET @tbl_elected_person_id=?;SET @tbl_elected_person_fullname=?; SET @tbl_elected_person_designation=?;SET @tbl_elected_person_ward=?;" +
      "SET @tbl_elected_person_contact_no=?;SET @tbl_elected_person_img=?;SET @tbl_elected_person_is_active=?;CALL sp_elected_person(@tbl_elected_person_id,@tbl_elected_person_fullname,@tbl_elected_person_designation," +
      "@tbl_elected_person_ward,@tbl_elected_person_contact_no,@tbl_elected_person_img, @tbl_elected_person_is_active)";

    mySqlConnection.query(
      sqlQuery,
      [
        req.body.tbl_elected_person_id,
        req.body.tbl_elected_person_fullname,
        req.body.tbl_elected_person_designation,
        req.body.tbl_elected_person_ward,
        req.body.tbl_elected_person_contact_no,
        ElectedPersonImg,
        1,
      ],
      (err, rows) => {
        if (!err) {
          if (req.body.previousImg != "" && ElectedPersonImg != "No image") {
            const path = "./elected_person/" + req.body.previousImg;
            if (fs.existsSync(path)) {
              try {
                fs.unlinkSync(path);
              } catch (err) {
                console.error(err);
              }
            }
          }
          res.status(201).json({
            message: "Elected Person updated successfully",
          });
        } else {
          console.log("Error :" + err);
        }
      }
    );
  }
);
//Edit elected person end
//Delete elected person
Router.put("/delete_elected_person", (req, res) => {
  // var FileName="";
  var sqlQuery =
    "SET @tbl_elected_person_id=?;SET @tbl_elected_person_fullname=?; SET @tbl_elected_person_designation=?;SET @tbl_elected_person_ward=?;" +
    "SET @tbl_elected_person_contact_no=?;SET @tbl_elected_person_img=?;SET @tbl_elected_person_is_active=?;CALL sp_elected_person(@tbl_elected_person_id,@tbl_elected_person_fullname,@tbl_elected_person_designation," +
    "@tbl_elected_person_ward,@tbl_elected_person_contact_no,@tbl_elected_person_img, @tbl_elected_person_is_active)";

  mySqlConnection.query(
    sqlQuery,
    [req.body.tbl_elected_person_id, "", 0, "", "", "", 0],
    (err, rows) => {
      if (!err) {
        if (req.body.previousImg) {
          const path = "./elected_person/" + req.body.previousImg;
          if (fs.existsSync(path)) {
            try {
              fs.unlinkSync(path);
            } catch (err) {
              console.error(err);
            }
          }
        }
        res.status(201).json({
          message: "Elected Person deleted successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Delete elected person end

//Designations for employee
Router.get("/emp_designation", (req, res) => {
  mySqlConnection.query(
    "select * from tbl_designation where tbl_designation_id>3 order by tbl_designation_id desc",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Designatons for employee end
//Add employee start
Router.post("/employee", upload_employee.single("employeeImg"), (req, res) => {
  var EmployeeImg = "";
  if (req.file !== undefined) {
    let newEmployee = req.file;
    EmployeeImg = newEmployee.filename;
  }
  console.log(
    "req.body.tbl_employee_designation:" + req.body.tbl_employee_designation
  );
  var sqlQuery =
    "SET @tbl_employee_id=?;SET @tbl_employee_fullName=?; SET @tbl_employee_designation=?;" +
    "SET @tbl_employee_contact_no=?;SET @tbl_employee_img=?; SET @tbl_employee_is_active=?;CALL sp_employee" +
    "(@tbl_employee_id,@tbl_employee_fullName,@tbl_employee_designation," +
    "@tbl_employee_contact_no,@tbl_employee_img, @tbl_employee_is_active)";

  mySqlConnection.query(
    sqlQuery,
    [
      req.body.tbl_employee_id,
      req.body.tbl_employee_fullName,
      req.body.tbl_employee_designation,
      req.body.tbl_employee_contact_no,
      EmployeeImg,
      1,
    ],
    (err, rows) => {
      if (!err) {
        res.status(201).json({
          message: "Employee added successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Add employee end
//Edit employee
Router.put("/employee", upload_employee.single("employeeImg"), (req, res) => {
  var EmployeeImg = "No image";
  if (req.file !== undefined) {
    let newEmployee = req.file;
    EmployeeImg = newEmployee.filename;
  }

  var sqlQuery =
    "SET @tbl_employee_id=?;SET @tbl_employee_fullName=?; SET @tbl_employee_designation=?;" +
    "SET @tbl_employee_contact_no=?;SET @tbl_employee_img=?; SET @tbl_employee_is_active=?;CALL sp_employee" +
    "(@tbl_employee_id,@tbl_employee_fullName,@tbl_employee_designation," +
    "@tbl_employee_contact_no,@tbl_employee_img, @tbl_employee_is_active)";

  mySqlConnection.query(
    sqlQuery,
    [
      req.body.tbl_employee_id,
      req.body.tbl_employee_fullName,
      req.body.tbl_employee_designation,
      req.body.tbl_employee_contact_no,
      EmployeeImg,
      1,
    ],
    (err, rows) => {
      if (!err) {
        if (req.body.tbl_employee_img != "" && EmployeeImg != "No image") {
          const path = "./employees/" + req.body.tbl_employee_img;
          if (fs.existsSync(path)) {
            try {
              fs.unlinkSync(path);
            } catch (err) {
              console.error(err);
            }
          }
        }
        // res.send(rows);
        res.status(201).json({
          message: "Employee info updated successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Edit employee end
//Employee list
Router.get("/employee_list", (req, res) => {
  mySqlConnection.query(
    "select tbl1.tbl_employee_id, tbl1.tbl_employee_fullName,tbl2.tbl_designation_name, tbl1.tbl_employee_contact_no,tbl1.tbl_employee_img" +
      " from tbl_employees as tbl1" +
      " Inner Join tbl_designation as tbl2 ON" +
      " tbl1.tbl_employee_designation=tbl2.tbl_designation_id" +
      " where tbl1.tbl_employee_is_active<> 0" +
      " order by tbl2.tbl_designation_id ASC;",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Employee list end
//Employee edit
Router.get("/employee_list/:id", (req, res) => {
  mySqlConnection.query(
    "SELECT * FROM db_gp_humbrat.tbl_employees where tbl_employee_id=?",
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
//Employee edit
//Delete employee

//Edit employee
Router.put("/delete_employee", (req, res) => {
  var sqlQuery =
    "SET @tbl_employee_id=?;SET @tbl_employee_fullName=?; SET @tbl_employee_designation=?;" +
    "SET @tbl_employee_contact_no=?;SET @tbl_employee_img=?; SET @tbl_employee_is_active=?;CALL sp_employee" +
    "(@tbl_employee_id,@tbl_employee_fullName,@tbl_employee_designation," +
    "@tbl_employee_contact_no,@tbl_employee_img, @tbl_employee_is_active)";

  mySqlConnection.query(
    sqlQuery,
    [req.body.tbl_employee_id, "", 0, "", req.body.tbl_employee_img, 0],
    (err, rows) => {
      if (!err) {
        // res.send(rows);
        if (req.body.tbl_employee_img != "") {
          const path = "./employees/" + req.body.tbl_employee_img;
          if (fs.existsSync(path)) {
            try {
              fs.unlinkSync(path);
              //file removed
            } catch (err) {
              console.error(err);
            }
          }
        }
        res.status(201).json({
          message: "Employee info deleted successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Edit employee end
//Delete employee
//Add designation
Router.post("/new_designation", (req, res) => {
  var sqlQuery =
    "SET @tbl_designation_id=?;SET @tbl_designation_name=?; CALL `sp_designation`(@tbl_designation_id,@tbl_designation_name);";
  mySqlConnection.query(
    sqlQuery,
    [0, req.body.tbl_designation_name],
    (err, rows) => {
      if (!err) {
        res.status(201).json({
          message: "Designation added successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Add designation end
//Edit designation start
Router.put("/edit_designation", (req, res) => {
  var designation = req.body;
  var sqlQuery =
    "SET @tbl_designation_id=?;SET @tbl_designation_name=?; CALL `sp_designation`(@tbl_designation_id,@tbl_designation_name);";
  mySqlConnection.query(
    sqlQuery,
    [designation.tbl_designation_id, designation.tbl_designation_name],
    (err, rows) => {
      if (!err) {
        res.status(201).json({
          message: "Designation edited successfully",
        });
      } else {
        console.log("Error :" + err);
      }
    }
  );
});
//Edit designation end
Router.delete("/delete_designation/:id", (req, res) => {
  var sqlQuery = "Delete from tbl_designation where tbl_designation_id=?";
  mySqlConnection.query(sqlQuery, [req.params.id], (err, rows) => {
    if (!err) {
      res.status(201).json({
        message: "Designation deleted successfully",
      });
    } else {
      console.log("Error :" + err);
    }
  });
});
//Delete designation end
module.exports = Router;
