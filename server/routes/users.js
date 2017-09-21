/*node-modules*/
var crypto = require("crypto");
var moment = require("moment");
/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/user.dao").userDAO;
/*令牌*/
var _token = require("./../tool/token");

/*登录*/
router.post("/login", function (req, res, next) {
  var userInfo = req.body;
  if (!userInfo.user_tel) {res.json({"code": "err601"});}
  else {
    db.getPasswordByTel(userInfo.user_tel, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "u301"}); }
        else {
          if (result[0].user_pwd === userInfo.user_pwd) {
            // 设置令牌
            var token = _token.jwtEn({
              iss: result[0].user_id,
              exp: moment().add(1, "d").valueOf()
            });
            res.json({"code": "u200", "ID": result[0].user_id, "token": token});
          } else {res.json({"code": "u302"});}
        }
      }
    });
  }
});

/*注册*/
router.post("/register", function (req, res, next) {
  var userInfo = extendParameters(req.body, {
    user_tel: null,
    user_pwd: null,
    school_id: null,
    profession_id: null
  });
  if (userInfo.user_tel && userInfo.user_pwd && userInfo.school_id && userInfo.profession_id) {
    userInfo.user_id = "u" + crypto.createHash("md5").update(userInfo.user_tel).digest("hex").substr(7, 16);
    db.addUser(userInfo, function (result) {
      switch (result) {
        case "u101":
          res.json({"code": "u101"});
          break;
        case "err501":
          res.json({"code": "err501"});
          break;
        case 1:
          // 设置令牌
          var token = _token.jwtEn({
            iss: userInfo.user_id,
            exp: moment().add(1, "d").valueOf()
          });
          res.json({"code": "u200", "ID": userInfo.user_id, "token": token});
          break;
      }
    });
  } else {res.json({"code": "err601"});}
});


/*获取用户数据*/
router.get("/data", _token.power, function (req, res, next) {
  if (req.ID) {
    db.getDataById(req.ID, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        var defaults = {
          "id": "",
          "name": "",
          "icon": ""
        };
        if (!result.length) {
          res.json({
            "code": "u402", "data": extendParameters({
              "id": req.ID,
              "name": req.ID
            }, defaults)
          });
        } else {
          res.json({
            "code": "u200", "data": extendParameters({
              "id": req.ID,
              "name": result[0].user_nickname,
              "icon": result[0].user_icon_path
            }, defaults)
          });
        }

      }
    });
  } else {
    res.json({"code": "err"});
  }
});


/*获取用户详情*/
router.post("/info", function (req, res, next) {
  req.ID = req.body.ID;
  if (!req.ID) {res.json({"code": "err601"});} else {
    db.getInfoById(req.ID, function (results) {
      var defaults = {
        "id": "",
        "name": "",
        "describe": "",
        "icon": "",
        "follower":0,
        "fans":0
      };
      if (!results[0].length) {
        var data = extendParameters({
          "id": req.ID,
          "name": req.ID
        }, defaults);
      } else {
        var data = extendParameters({
          "id": req.ID,
          "name": results[0][0]["user_nickname"],
          "describe": results[0][0]["user_self"],
          "icon": results[0][0]["user_icon_path"],
          "follower": results[1][0]["by_att"],
          "fans": results[2][0]["att"]
        }, defaults);
      }
      res.json({"code": "u200", "data": data});
    });
  }
});

/*测试接口*/
/*router.post("/test",_token.power ,function (req, res, next) {
  res.json({"已验证ID":req.ID});
});*/


module.exports = router;

function extendParameters (options, defaults) {
  for (var option in defaults) {
    var t = options[option] === undefined && typeof option !== "function";
    if (t) {
      options[option] = defaults[option];
    }
  }
  return options;
}
