var fileUp = require("./../configs/fileUpload.config");
/*express*/
var express = require("express");
var router = express.Router();


// router.post("/singleFile", fileUp.upload.single("icon"), function (req, res, next) {
//   console.log("qqq");
//   console.log(req.file);
//   res.end();
// });

router.post("/iconUpload", function (req, res) {
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
      res.json({"code": "f200", "src": req.file.filename});
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
        src.push(req.files[i].filename);
      }
      // 连接数据库
      res.json({"code": "f200", "src": src});
      // res.json({"code": req.files});
    }
    console.log(req.files);
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
        src.push(req.files[i].filename);
      }

      // 连接数据库;
      res.json({"code": "f200", "src": src});
      // res.json({"code": req.files});
    }
    console.log(req.files);
  });
});

module.exports = router;