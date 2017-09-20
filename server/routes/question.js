/*node-modules*/

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
                "icon": result[i].user_icon_path ? "static/" + result[i].user_icon_path : "static/icon.default.png"
              },
              "question": {
                "id": result[i].prob_id,
                "title": result[i].prob_title
              },
              "answer": {
                "id": result[i].answer_id,
                "type": result[i].profession_name,
                "link": result[i].ans_content
              },
              "quantity": {
                "praise": result[i].like_num ? result[i].like_num : "0",
                "comment": result[i].sumcm,
                "transpond": result[i].sumt,
                "collect": result[i].sumc
              }
            });
          }
          res.json(arr);
        }
      }
    });
  }
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

