/*node-modules*/

/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/everyday.dao").everydayDAO;
/*令牌*/
var _token = require("./../tool/token");

/*写日常*/
router.post("/writing", _token.power, function (req, res, next) {
  if (req.ID && req.body.text) {
    db.writing(req.ID, req.body.text, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": "e200"});
      }
    });
  } else {
    res.json({"code": "err601"});
  }
});
/*查日常*/
router.post("/select", function (req, res, next) {

  db.select(function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      res.json({"code": "e200","data":result});
    }
  });

});


module.exports = router;
