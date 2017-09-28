var interCgf = require("./../tool/internationalization");
var bCfg = require("./../configs/basic.config");
/*node-modules*/
var moment = require("moment");
// 国际化
moment.locale("zh-cn", interCgf.moment);

/*express*/
var express = require("express");
var router = express.Router();
/*数据库*/
var db = require("./../database/DAO/question.dao").questionDAO;
/*令牌*/
var _token = require("./../tool/token");
/**/

/*首页渲染*/
router.post("/index", _token.power, function (req, res, next) {
  if (!req.ID) {res.json({"code": "err601"});}
  else {
    db.getListByPro(req.ID, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "q301"}); }
        else {
          var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
          var end = ~~start + ~~length, count = 0;
          var arr = [];
          for (var i in result) {
            count++;
            if (count < (~~start)) {continue;}
            if (count >= end) {break;}
            arr.push({
              "answerer": {
                "id": result[i].user_ans_id,
                "name": result[i].user_nickname,
                "describe": result[i].user_self,
                "profession": result[i].profession_name,
                "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
              },
              "question": {
                "id": result[i].prob_id,
                "type": result[i].profession_name,
                "title": result[i].prob_title,
                "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[i].prob_time, moment.ISO_8601).fromNow()
              },
              "answer": {
                "id": result[i].answer_id,
                "link": result[i].ans_content,
                "text": result[i].ans_content.replace(/<[^>]+>/ig,""),
                "img":result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig)?result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig):[],
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
          res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
        }
      }
    });
  }
});

/*问题详情*/
router.post("/info", function (req, res, next) {
  if (!req.body.id) {res.json({"code": "err601"});} else {
    db.getInfoByAsnId(req.body.id, function (result) {
        if (result === "err501") {res.json({"code": result});} else {
          if (!result.length) {res.json({"code": "q302"});} else {
            var data = {
              "question": {
                "id": result[0].prob_id,
                "type": result[0].profession_name,
                "title": result[0].prob_title,
                "link": result[0].prob_content,
                "time": moment() - moment(result[0].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[0].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[0].prob_time, moment.ISO_8601).fromNow()
              }, "answerer": {
                "id": result[0].user_ans_id,
                "name": result[0].user_nickname,
                "describe": result[0].user_self,
                "icon": result[0].user_icon_path ? "static/" + result[0].user_icon_path : "static/icon.default.png"
              }, "answer": {
                "id": result[0].answer_id,
                "link": result[0].ans_content,
                "text": result[i].ans_content.replace(/<[^>]+>/ig,""),
                "img":result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig)?result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig):[],
                "time": moment() - moment(result[0].ans_time, moment.ISO_8601) > 259200000
                  ? moment(result[0].ans_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[0].ans_time, moment.ISO_8601).fromNow()
              }, "quantity": {
                "praise": result[0].like_num ? result[0].like_num : 0,
                "comment": result[0].sumcm,
                "transpond": result[0].sumt,
                "collect": result[0].sumc
              }
            };
            res.json({"code": "q200", "data": data});
          }
        }
      }
    );
  }
});

/*加载更多数据*/
router.post("/more", function (req, res, next) {
  if (req.body.queId) {
    db.getMoreByQueId(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result[0].length&&result[1].length) {
          res.json({
              "code": "q303",
              "question": {
                "id": result[1][0].prob_id,
                "title": result[1][0].prob_title,
                "link": result[1][0].prob_content,
                "time": moment() - moment(result[1][0].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[1][0].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[1][0].prob_time, moment.ISO_8601).fromNow()
              }
            }
          );
        } else if(result[0].length) {
          var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
          var end = ~~start + ~~length, count = 0;
          var arr = [];
          for (var i in result) {
            count++;
            if (count < (~~start)) {continue;}
            if (count >= end) {break;}
            arr.push({
              "answerer": {
                "id": result[0][i].user_ans_id,
                "name": result[0][i].user_nickname,
                "describe": result[0][i].user_self,
                "profession": result[0][i].profession_name,
                "icon": result[0][i].user_icon_path ? "static/" + result[0][i].user_icon_path : "static/icon.default.png"
              },
              "question": {
                "id": result[0][i].prob_id,
                "title": result[0][i].prob_title,
                "link": result[0][i].prob_content,
                "time": moment() - moment(result[0][i].prob_time, moment.ISO_8601) > 259200000
                  ? moment(result[0][i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[0][i].prob_time, moment.ISO_8601).fromNow()
              },
              "answer": {
                "id": result[0][i].answer_id,
                "link": result[0][i].ans_content,
                "text": result[i].ans_content.replace(/<[^>]+>/ig,""),
                "img":result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig)?result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig):[],
                "time": moment() - moment(result[0][i].ans_time, moment.ISO_8601) > 259200000
                  ? moment(result[0][i].ans_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                  : moment(result[0][i].ans_time, moment.ISO_8601).fromNow()
              },
              "quantity": {
                "praise": result[0][i].like_num ? result[0][i].like_num : "0",
                "comment": result[0][i].sumcm,
                "transpond": result[0][i].sumt,
                "collect": result[0][i].sumc
              }
            });
          }
          res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
        }else {res.json({"code": "err601"});}
      }
    });
  } else {res.json({"code": "err601"});}
});

/*搜索问题*/
router.post("/search", function (req, res, next) {
  if (req.body.keyword) {
    db.getSearchByKey(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "q302"}); }
        else {
          var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
          var end = ~~start + ~~length, count = 0;
          var arr = [];
          for (var i in result) {
            count++;
            if (count < (~~start)) {continue;}
            if (count >= end) {break;}
            arr.push({
              "answerer": {
                "id": result[i].user_ans_id,
                "name": result[i].user_nickname,
                "describe": result[i].user_self,
                "profession": result[i].profession_name,
                "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
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
                "text": result[i].ans_content.replace(/<[^>]+>/ig,""),
                "img":result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig)?result[i].ans_content.match(/src=(\'|\")(.*?)(\'|\")/ig):[],
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
          res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});

/*提问*/
router.post("/put", _token.power, function (req, res, next) {
  if (req.ID && req.body.title && req.body.profession && req.body.link) {
    db.setQuestion(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result});
      }
    });
  } else {res.json({"code": "err601"});}
});

/*点赞----有可能有BUG*/
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

/*回答*/
router.post("/reply", _token.power, function (req, res, next) {
  if (req.body.link) {
    db.addReply(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result});
      }
    });
  } else {res.json({"code": "err601"});}
});

/*评论*/
router.post("/comment", function (req, res, next) {
  if (req.body.id) {
    db.getCommentByAnsId(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "q302"}); }
        else {
          var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
          var end = ~~start + ~~length, count = 0;
          var arr = [];
          for (var i in result) {
            count++;
            if (count < (~~start)) {continue;}
            if (count >= end) {break;}
            arr.push({
              "commenter": {
                "id": result[i].user_id,
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
          res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
        }
      }
    });
  } else {res.json({"code": "err601"});}
});

/*评论回答*/
router.post("/setComment", _token.power, function (req, res, next) {
  if (req.body.link && req.body.id) {
    db.addComment(req, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        res.json({"code": result});
      }
    });
  } else {res.json({"code": "err601"});}
});

/*专业问题*/
router.post("/getMajorQ", _token.power, function (req, res, next) {
  db.getMajorQ(req, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "q302"}); }
      else {
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        var arr = [];
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "question": {
              "id": result[i].prob_id,
              "title": result[i].prob_title,
              "link": result[i].prob_content,
              "type": result[i].profession_name,
              "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].prob_time, moment.ISO_8601).fromNow()
            },
            "answer": result[i].sumdan
          });
        }
        res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });

});
/*热门问题*/
router.post("/getHotQ", function (req, res, next) {
  db.getHotQ(req.body.sort, function (result) {
    if (result === "err501") {res.json({"code": result});}
    else {
      if (!result.length) {res.json({"code": "q302"}); }
      else {
        var start = req.body.start || bCfg.getStart, length = req.body.length || bCfg.getDataLength;
        var end = ~~start + ~~length, count = 0;
        var arr = [];
        for (var i in result) {
          count++;
          if (count < (~~start)) {continue;}
          if (count >= end) {break;}
          arr.push({
            "question": {
              "id": result[i].prob_id,
              "title": result[i].prob_title,
              "link": result[i].prob_content,
              "time": moment() - moment(result[i].prob_time, moment.ISO_8601) > 259200000
                ? moment(result[i].prob_time).format("YYYY年MMMDo,dddd,h:mm:ss")
                : moment(result[i].prob_time, moment.ISO_8601).fromNow()
            },
            "answer": result[i].sumdan
          });
        }
        res.json({"code": "q200", "data": arr, "next": (end > result.length) ? -1 : count});
      }
    }
  });
});


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
