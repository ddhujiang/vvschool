var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

/*连接数据库池*/
var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/everyday.inquire").query;


var everydayDAO = {
  hasEDay:function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("hasEDay: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.hasEDay, [id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("hasEDay: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  },
  getEDay:function (id,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getEDay: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getEDay, [id,id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("getEDay: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  },
  setEDay:function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("setEDay: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.setEDay, [req.ID,req.body.link], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("setEDay: " + err.message);
        } else {
          cb(result.affectedRows===1?"e200":"e404");}
        client.release();
      });
    });
  },
  getCommentById:function (id,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getCommentById: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getCommentById, [id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("getCommentById: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  },
  setComment:function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("setComment: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.setComment, [req.ID,req.body.id,req.body.link], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("setComment: " + err.message);
        } else {
          cb(result.affectedRows===1?"e200":"e404");}
        client.release();
      });
    });
  },
};

exports.everydayDAO = everydayDAO;

