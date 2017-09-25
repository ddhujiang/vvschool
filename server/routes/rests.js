/*node-modules*/
var crypto = require("crypto");
var moment = require("moment");
/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/rests.dao").restsDAO;
/*令牌*/
var _token = require("./../tool/token");

/*关注*/
router.post("/hasFollower", function (req, res, next) {
  if (req.body.id) {
    db.hasFollower(req.body.id, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"follower": result[0][0]["att"], "fans": result[1][0]["by_att"]});
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/isFollower", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.isFollower(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result.length ? "r901" : "r904"});
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/addFollower", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.addFollower(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r901"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteFollower", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.deleteFollower(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r904"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/getFollower", _token.power, function (req, res, next) {
  db.getFollower(req.ID, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "r904"}); }
      else {
        var arr = [];
        for (var i in result) {
          arr.push({
            "id": result[i].user_id,
            "name": result[i].user_nickname,
            "describe": result[i].user_self,
            "profession": result[i].profession_name,
            "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
          });
        }
        res.json({"code":"r200","data":arr});
      }
    }
  });
});
router.post("/getFans", _token.power, function (req, res, next) {
  db.getFans(req.ID, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "r904"}); }
      else {
        var arr = [];
        for (var i in result) {
          arr.push({
            "id": result[i].user_id,
            "name": result[i].user_nickname,
            "describe": result[i].user_self,
            "profession": result[i].profession_name,
            "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
          });
        }
        res.json({"code":"r200","data":arr});
      }
    }
  });
});

/*收藏*/
router.post("/isCollect", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.isCollect(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result.length ? "r901" : "r904"});
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/addCollect", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.addCollect(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r901"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteCollect", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.deleteCollect(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r904"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/getCollect", _token.power, function (req, res, next) {
  db.getCollect(req.ID, function (result) {
    console.log(result);
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "r303"}); }
      else {
        var arr = [];
        for (var i in result) {
          arr.push({
            "answerer": {
              "id": result[i].user_ans_id,
              "name": result[i].user_nickname,
              "describe": result[i].user_self,
              "profession": result[i].profession_name,
              "icon": "static/" + (result[i].user_icon_path ? result[i].user_icon_path : "icon.default.png")
            },
            "question": {
              "id": result[i].prob_id,
              "title": result[i].prob_title,
              "link": result[i].prob_content,
              "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].prob_time, moment.ISO_8601).fromNow()
            },
            "answer": {
              "id": result[i].answer_id,
              "link": result[i].ans_content,
              "time": moment() - moment(result[i].ans_time, moment.ISO_8601) > 259200000
                ? moment(result[i].ans_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].ans_time, moment.ISO_8601).fromNow()
            },
            "quantity": {
              "praise": result[i].like_num ? result[i].like_num : "0",
              "comment": result[i].sumcm,
              "transpond": result[i].sumt,
              "collect": result[i].sumc
            }
          });
        }
        res.json({"code": "r200", "data": arr});
      }
    }
  });
});

/*转发*/
/*router.post("/isTranspond", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.isTranspond(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result.length ? "r901" : "r904"});
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/addTranspond", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.addCollect(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r901"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteTranspond", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.deleteCollect(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (result[0].length) {
          res.json({"code": result[1].affectedRows === 1 ? "r200" : "r404"});
        } else {
          res.json({"code": "r904"});
        }
      }
    });
  } else {res.json({"code": "err601"});}
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


