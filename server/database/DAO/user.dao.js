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
        sqlclient.queries(inquire.addUser,
          [
            [info.user_id, info.user_tel, info.user_pwd, info.school_id, info.profession_id],
            [info.user_id, "icon.default.png"],
            [info.user_id,info.user_id.substr(0, 8)]
          ], {
            skip: function (i, arg, results) {
              var skip = true;
              switch (i) {
                case 1:
                  //handle second SQL
                  //Execute the second SQL depending on the first SQL result.
                  skip = results[0].affectedRows === 1;
                  break;
              }
              return !skip;
            }
          },
          function (err, results) {
            if (!!err) {
              console.error("addUser: " + err.message);
              cb({"code": "err501"});
            }
            cb((results[1].affectedRows === 1 && results[2].affectedRows === 1)?"u200":"err501");
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
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getAnswerByUId: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getAnswerByUId, [req.body.id, req.body.sort ? "a.ans_time" : "a.like_num"], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getAnswerByUId: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  queryIcon:function  (id,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("queryIcon: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.queryIcon, [id], function (err, result) {
        if (err) {
          cb("err501");
          console.error("queryIcon: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  addIcon:function (req,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("iconUpload: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addIcon, [req.ID,req.body.src], function (err, result) {
        if (err) {
          cb("err501");
          console.error("iconUpload: " + err.message);
          return;
        }
        cb(result.affectedRows===1?"f200":"f301");
        client.release();
      });
    });
  },
  addName:function (req,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addName: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addName, [req.body.name,req.ID], function (err, result) {
        if (err) {
          cb("err501");
          console.error("addName: " + err.message);
          return;
        }
        cb(result.affectedRows===1?"u200":"u301");
        client.release();
      });
    });
  },
  addDescribe:function (req,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addDescribe: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addDescribe, [req.body.describe,req.ID], function (err, result) {
        if (err) {
          cb("err501");
          console.error("addDescribe: " + err.message);
          return;
        }
        cb(result.affectedRows===1?"u200":"u301");
        client.release();
      });
    });
  }
};

exports.userDAO = userDAO;

