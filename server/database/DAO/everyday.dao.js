var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

/*连接数据库池*/
var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/everyday.inquire").query;


var everydayDAO = {
  writing:function (id,text,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("writing: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.writing, [id,text], function (err, result) {
        if (err) {
          cb("err501");
          console.error("writing: " + err.message);
          return;
        }
        console.log(result);
        cb(result);
        client.release();
      });
    });
  },
  select:function (cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("select: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.select, function (err, result) {
        if (err) {
          cb("err501");
          console.error("select: " + err.message);
          return;
        }
        console.log(result);
        cb(result);
        client.release();
      });
    });
  }
};

exports.everydayDAO = everydayDAO;

