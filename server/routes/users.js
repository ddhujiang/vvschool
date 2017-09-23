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
        case "u200":
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
              "icon": "static/" + result[0].user_icon_path ? result[0].user_icon_path : "icon.default.png"
            }, defaults)
          });
        }

      }
    });
  } else {
    res.json({"code": "err601"});
  }
});

/*获取用户详情*/
/*有BUG----------------------------------------------------------------------*/
router.post("/info", function (req, res, next) {
  req.ID = req.body.ID;
  if (!req.ID) {res.json({"code": "err601"});} else {
    db.getInfoById(req.ID, function (results) {
      var data, defaults = {
        "id": req.ID,
        "name": req.ID.substr(0, 8),
        "describe": "",
        "icon": "",
        "profession": "",
        "follower": 0,
        "fans": 0,
        "question": 0,
        "answer": 0
      };
      console.log(results[0].length);
      if (results[0].length) {
        data = extendParameters({
          "name": results[0][0]["user_nickname"],
          "describe": results[0][0]["user_self"],
          "icon": "static/" + results[0][0]["user_icon_path"] ? results[0][0]["user_icon_path"] : "icon.default.png"
        }, defaults);
      } else {
        data = extendParameters({}, defaults);
      }

      data["profession"] = results[0][0]["profession_name"];
      data["follower"] = results[1][0]["by_att"];
      data["fans"] = results[2][0]["att"];
      data["question"] = results[3][0]["count"];
      data["answer"] = results[4][0]["count"];
      res.json({"code": "u200", "data": data});
    });
  }
});

/*搜索用户*/
router.post("/search", function (req, res, next) {
  if (req.body.keyword) {
    db.getSearchByKeyName(req.body.keyword, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "u302"}); }
        else {
          var arr = [];
          for (var i in result) {
            arr.push({
              "user": {
                "id": result[i].id,
                "name": result[i].user_nickname,
                "describe": result[i].user_self,
                "profession": result[i].profession_name,
                "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
              }
            });
          }
          res.json({"code": "u200", "data": arr});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});

/*用户提问*/
router.post("/question", function (req, res, next) {
  if (req.body.id) {
    db.getQuestionByUId(req.body.id, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "u302"}); }
        else {
          var arr = [];
          for (var i in result) {
            arr.push({
              "question": {
                "id": result[i].prob_id,
                "title": result[i].prob_title,
                "link": result[i].prob_content,
                "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[i].prob_time, moment.ISO_8601).fromNow(),
                "ansNum": result[i].sumdan
              }
            });
          }
          res.json({"code": "u200", "data": arr});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});

/*用户回答*/
router.post("/answer", function (req, res, next) {
  console.log(req.body.id);
  if (req.body.id) {
    db.getAnswerByUId(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "u302"}); }
        else {
          var arr = [];
          for (var i in result) {
            arr.push({
              "answer": {
                "id": result[i].answer_id,
                "link": result[i].ans_content,
                "time": moment() - moment(result[i].ans_time, moment.ISO_8601) > 259200000
                  ? moment(result[i].ans_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[i].ans_time, moment.ISO_8601).fromNow()
              },
              "question": {
                "id": result[i].prob_id,
                "title": result[i].prob_title,
                "link": result[i].prob_content,
                "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[i].prob_time, moment.ISO_8601).fromNow()
              },
              "praise": result[i].like_num ? result[i].like_num : "0"
            });
          }
          res.json({"code": "u200", "data": arr});
        }
      }
    });
  } else {res.json({"code": "err601"});}
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


