var interCgf = require("./../tool/internationalization");

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
router.get("/index", _token.power, function (req, res, next) {
  if (!req.ID) {res.json({"code": "err601"});}
  else {
    db.getListByPro(req.ID, function (result) {
      if (result === "err501") {res.json({"code": result});}
      else {
        if (!result.length) {res.json({"code": "q301"}); }
        else {
          var arr = [];
          for (var i in result) {
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
                "title": result[i].prob_title
              },
              "answer": {
                "id": result[i].answer_id,
                "type": result[i].profession_name,
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
          res.json({"code": "q200", "data": arr});
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
          if (!result.length) {res.json({"code": "err601"});} else {
            var data = {
              "question": {
                "id": result[0].prob_id,
                "title": result[0].prob_title,
                "link": result[0].prob_content
              }, "answerer": {
                "id": result[0].user_ans_id,
                "name": result[0].user_nickname,
                "describe": result[0].user_self,
                "profession": result[0].profession_name,
                "icon": result[0].user_icon_path ? "static/" + result[0].user_icon_path : "static/icon.default.png"
              }, "answer": {
                "id": result[0].answer_id,
                "link": result[0].ans_content,
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
        // res.json(result);
      }
    );
  }
});

/*加载更多数据*/
router.post("/more", function (req, res, next) {
  console.log(req.body.queId);
  if (req.body.ansId && req.body.queId) {
    db.getMoreByQueId(req.body.ansId, req.body.queId, function (result) {
      if (result === "err501") {res.json({"code": result});} else {

      }
    });
  } else {res.json({"code": "err601"});}
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

