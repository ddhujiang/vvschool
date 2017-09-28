/*node-modules*/
var moment = require("moment");
/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/everyday.dao").everydayDAO;
/*令牌*/
var _token = require("./../tool/token");
/*数据配置*/
var bCfg = require("./../configs/basic.config");

router.post("/hasEDay", _token.power, function (req, res, next) {
  db.hasEDay(req.ID, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      res.json({"everyday": result[0].num});
    }
  });
});
router.post("/getEDay", _token.power, function (req, res, next) {
  db.getEDay(req.ID, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "e301"}); }
      else {
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        var arr = [];
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "user": {
              "id": result[i].user_id,
              "name": result[i].user_nickname,
              "describe": result[i].user_self,
              "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
            },
            "everyday": {
              "id": result[i].dynamic_id,
              "link": result[i].dy_content,
              "time": moment() - moment(result[i].dy_time, moment.ISO_8601) > 259200000
                ? moment(result[i].dy_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].dy_time, moment.ISO_8601).fromNow()
            },
            "quantity": {
              "praise": result[i].like_num ? result[i].like_num : "0",
              "comment": result[i].sumdcm,
              "transpond": result[i].sumdt
            },
            "img": result[i].img ? result[i].img.split(",") : []
          });
        }
        res.json({"code": "e200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });
});
router.post("/getEDayBySelf", function (req, res, next) {
  db.getEDayBySelf(req.body.id, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "e301"}); }
      else {
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        var arr = [];
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "user": {
              "id": result[i].user_id,
              "name": result[i].user_nickname,
              "describe": result[i].user_self,
              "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
            },
            "everyday": {
              "id": result[i].dynamic_id,
              "link": result[i].dy_content,
              "time": moment() - moment(result[i].dy_time, moment.ISO_8601) > 259200000
                ? moment(result[i].dy_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].dy_time, moment.ISO_8601).fromNow()
            },
            "quantity": {
              "praise": result[i].like_num ? result[i].like_num : "0",
              "comment": result[i].sumdcm,
              "transpond": result[i].sumdt
            },
            "img": result[i].img ? result[i].img.split(",") : []
          });
        }
        res.json({"code": "e200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });
});
/*未实现------------------------------------------start*/
router.post("/getEDayByRelay", function (req, res, next) {
  db.getEDayByRelay(req.body.id, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "e301"}); }
      else {
        var arr = [];
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "user": {
              "id": result[i].user_id,
              "name": result[i].user_nickname,
              "describe": result[i].user_self,
              "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
            },
            "everyday": {
              "id": result[i].dynamic_id,
              "link": result[i].dy_content,
              "time": moment() - moment(result[i].dy_time, moment.ISO_8601) > 259200000
                ? moment(result[i].dy_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].dy_time, moment.ISO_8601).fromNow()
            },
            "quantity": {
              "praise": result[i].like_num ? result[i].like_num : "0",
              "comment": result[i].sumdcm,
              "transpond": result[i].sumdt
            },
            "img": result[i].img ? result[i].img.split(",") : []
          });
        }
        res.json({"code": "e200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });
});
/*未实现------------------------------------------end*/
router.post("/setEDay", _token.power, function (req, res, next) {
  if (req.body.link) {
    db.setEDay(req, function (result) {
      res.json({"code": result});
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteEDay", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.deleteEDay(req, function (result) {
      res.json({"code": result});
    });
  } else {res.json({"code": "err601"});}
});
router.post("/searchEDay", function (req, res, next) {
  db.searchEDay(req, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "e301"}); }
      else {
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        var arr = [];
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "user": {
              "id": result[i].user_id,
              "name": result[i].user_nickname,
              "describe": result[i].user_self,
              "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
            },
            "everyday": {
              "id": result[i].dynamic_id,
              "link": result[i].dy_content,
              "time": moment() - moment(result[i].dy_time, moment.ISO_8601) > 259200000
                ? moment(result[i].dy_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].dy_time, moment.ISO_8601).fromNow()
            },
            "quantity": {
              "praise": result[i].like_num ? result[i].like_num : "0",
              "comment": result[i].sumdcm,
              "transpond": result[i].sumdt
            },
            "img": result[i].img ? result[i].img.split(",") : []
          });
        }
        res.json({"code": "e200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });
});
router.post("/getCommentById", function (req, res, next) {
  if (req.body.id) {
    db.getCommentById(req.body.id, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "e302"}); }
        else {
          var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
          var end = ~~start + ~~length, count = 0;
          var arr = [];
          for (var i in result) {
            arr.push({
              "user": {
                "id": result[i].user_comm_id,
                "name": result[i].user_nickname,
                "describe": result[i].user_self,
                "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
              },
              "comment": {
                "id": result[i].comm_id,
                "link": result[i].comm_content,
                "time": moment() - moment(result[i].comm_time, moment.ISO_8601) > 259200000
                  ? moment(result[i].comm_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[i].comm_time, moment.ISO_8601).fromNow()
              }
            });
          }
          res.json({"code": "e200", "data": arr, "next": (end > result.length) ? -1 : count});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});
router.post("/setComment", _token.power, function (req, res, next) {
  if (req.body.link) {
    db.setComment(req, function (result) {
      res.json({"code": result});
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteComBySelf", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.deleteComBySelf(req, function (result) {
      res.json({"code": result});
    });
  } else {res.json({"code": "err601"});}
});
router.post("/deleteComById", function (req, res, next) {
  if (req.body.id) {
    db.deleteComById(req.body.id, function (result) {
      res.json({"code": result});
    });
  } else {res.json({"code": "err601"});}
});
router.post("/like", _token.power, function (req, res, next) {
  if (req.body.id) {
    db.addLikeNum(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result});
      }
    });
  } else {res.json({"code": "err601"});}
});
module.exports = router;
