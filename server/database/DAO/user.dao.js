var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

/*连接数据库池*/
var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/user.inquire").query;


var userDAO = {
  getPasswordByTel: function (tel, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getPasswordByTel: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getPasswordByTel, [tel], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getPasswordById: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  addUser: function (info, cb) {
    this.getIdByTel(info.user_tel, function (result) {
      if (result !== "err501" && !result.length) {
        // icon.default.png
        sqlclient.queries(inquire.addUser, [[info.user_id, info.user_tel, info.user_pwd, info.school_id, info.profession_id], [info.user_id, "icon.default.png"]], function (err, results) {
          console.log(results);
          if (!!err) {
            console.error("addUser: " + err.message);
            cb({"code": "err501"});
          }
          if (results[0].affectedRows === 1 && results[1].affectedRows === 1) {
            cb("u200");
          } else {cb("err501");}
        });
      } else {cb("u101");}
    });
  },
  getIdByTel: function (tel, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        cb("err501");
        return;
      }
      client.query(inquire.getIdByTel, [tel], function (err, result) {
        if (err) {
          cb("err501");
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getDataById: function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getDataById: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getDataById, [id, id], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getDataById: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getInfoById: function (id, cb) {
    sqlclient.queries(inquire.getInfoById, [[id, id], [id], [id], [id], [id]], function (err, results) {
      console.log(results);
      if (!!err) {
        console.log("getInfoById:" + err.message);
        cb({"code": "err501"});
      } else {cb(results);}
    });
  },
  getSearchByKeyName: function (name, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getSearchByKeyName: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getSearchByKeyName, [name], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getSearchByKeyName: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getQuestionByUId: function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getQuestionByUId: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getQuestionByUId, [id], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getQuestionByUId: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getAnswerByUId: function (req, cb) {
    console.log(req.body.id);
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getAnswerByUId: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getAnswerByUId, [req.body.id,req.body.sort ? "a.ans_time" : "a.like_num"], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getAnswerByUId: " + err.message);
          return;
        }
        console.log(result);
        cb(result);
        client.release();
      });
    });
  }
};

exports.userDAO = userDAO;

