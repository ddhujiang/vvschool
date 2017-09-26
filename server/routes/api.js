var fs = require("fs");
var path = require("path");
var fileUp = require("./../configs/fileUpload.config");
/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/api.dao").apiDAO;
/*令牌*/
var _token = require("./../tool/token");
// router.post("/singleFile", fileUp.upload.single("icon"), function (req, res, next) {
//   console.log("qqq");
//   console.log(req.file);
//   res.end();
// });

router.post("/iconUpload", _token.power, function (req, res) {
  fileUp.icon(req, res, function (err) {
    if (err) {
      switch (err.message) {
        case "File too large":
          res.json({"code": "f302"});
          break;
        case "Unexpected field":
          res.json({"code": "f304"});
          break;
        default:
          res.json({"code": "err601"});
      }
      console.log("api-iconUpload:" + err.message);
      return;
    }
    if (!req.file) {res.json({"code": "f303"});}
    else {
      // 连接数据库
      // var filePath = req.file.filename;
      db.iconUpload(req, function (result) {
        if (result === "err501") {res.json({"code": result});}
        else {
          res.json({"code": "f200", "src": "/static/" + req.file.filename});
          console.log(result);
        }
      });
      // res.json({"code": "f200", "src": "/static/"+req.file.filename});
    }
  });
});

router.post("/photoUpload", function (req, res) {
  fileUp.photo(req, res, function (err) {
    if (err) {
      switch (err.message) {
        case "File too large":
          res.json({"code": "f302"});
          break;
        case "Unexpected field":
          res.json({"code": "f304"});
          break;
        default:
          res.json({"code": "err601"});
      }
      console.log("api-photoUpload:" + err.message);
      return;
    }
    if (!req.files.length) {res.json({"code": "f303"});}
    else {
      var src = [];
      var length = req.files.length;
      for (var i = 0; i < length; i++) {
        src.push("/static/" + req.files[i].filename);
      }
      // 连接数据库
      res.json({"code": "f200", "src": src});
      // res.json({"code": req.files});
    }
  });
});

router.post("/files", function (req, res) {
  fileUp.files(req, res, function (err) {
    if (err) {
      switch (err.message) {
        case "File too large":
          res.json({"code": "f302"});
          break;
        case "Unexpected field":
          res.json({"code": "f304"});
          break;
        default:
          res.json({"code": "err601"});
      }
      console.log("api-files:" + err.message);
      return;
    }
    if (!req.files.length) {res.json({"code": "f303"});}
    else {
      var src = [];
      var length = req.files.length;
      for (var i = 0; i < length; i++) {
        src.push("/static/" + req.files[i].filename);
      }

      // 连接数据库;
      res.json({"code": "f200", "src": src});
      // res.json({"code": req.files});
    }
    console.log(req.files);
  });
});

/*删除上传图片*/
router.post("/deleteFile", function (req, res) {
  fs.unlink(path.join(__dirname, "../public/uploads", req.body.name.substring(7)), function () {
    res.json({"code": 200});
  });
});
module.exports = router;