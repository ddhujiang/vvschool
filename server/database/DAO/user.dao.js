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
        pool.getConnection(function (err, conn) {
          if (err) {return;}
          conn.query(inquire.addUser, [info.user_id, info.user_tel, info.user_pwd, info.school_id, info.profession_id], function (err, result) {
            if (err) {
              console.error("addUser: " + err.message);
              cb("err501");
              return;
            }
            cb(result.affectedRows);
            conn.release();
          });
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
    sqlclient.queries(inquire.getInfoById, [[id], [id], [id]], function (err, results) {
      console.log(results);
      if (!!err) {
        cb({"code": "err501"});
        console.log("getInfoById:" + err.message);
      } else {cb(results);}
    });
  }
};

exports.userDAO = userDAO;

