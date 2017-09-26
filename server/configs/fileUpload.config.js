var path = require("path");
var multer = require("multer");
var UUID = require("uuid-js");

var storage = multer.diskStorage({
  // 设置上传后文件路径。
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/uploads"));
  },
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + "." + UUID.create(4) + "." + fileFormat[fileFormat.length - 1]);
  }
});

//添加配置文件到muler对象。
var upload = multer({
  storage: storage,
  limits: {
    fileSize:1048576
  }
});

var fileUpload = {
  upload: multer({storage: storage}),
  icon: upload.single("icon"),
  photo: upload.array("image", 9),
  files: upload.array("file")
};

//导出对象
module.exports = fileUpload;
