var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

/*连接数据库池*/
var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/everyday.inquire").query;


var everydayDAO = {
  hasEDay: function (id, cb) {
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
  getEDay: function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getEDay: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getEDay, [id, id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("getEDay: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  },
  setEDay: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("setEDay: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.setEDay, [req.ID, req.body.link], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("setEDay: " + err.message);
        } else {
          cb(result.affectedRows === 1 ? "e200" : "e404");
        }
        client.release();
      });
    });
  },
  deleteEDay: function (req, cb) {
    sqlclient.queries(inquire.deleteEDay, [[req.body.id], [req.body.id], [req.body.id, req.ID]], {
      skip: function (i, arg, results) {
        var skip = false;
        switch (i) {
          case 1:
            skip = results[0].length === 0;
            break;
          case 2:
            skip = results[1].length === 0;
            break;
        }
        return skip;
      }
    }, function (err, results) {
      if (!!err) {
        console.error("deleteEDay: " + err.message);
        cb("err501");
      } else {cb(results[2].affectedRows === 1 ? "e200" : "e404");}
    });
  },
  getCommentById: function (id, cb) {
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
  setComment: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("setComment: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.setComment, [req.ID, req.body.id, req.body.link], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("setComment: " + err.message);
        } else {
          cb(result.affectedRows === 1 ? "e200" : "e404");
        }
        client.release();
      });
    });
  },
  deleteComBySelf: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("deleteComBySelf: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.deleteComBySelf, [req.body.id, req.ID], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("deleteComBySelf: " + err.message);
        } else {cb(result.affectedRows === 1 ? "e200" : "e404");}
        client.release();
      });
    });
  },
  deleteComById: function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("deleteComById: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.deleteComById, [id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("deleteComById: " + err.message);
        } else {cb(result.affectedRows === 1 ? "e200" : "e404");}
        client.release();
      });
    });
  }
};

exports.everydayDAO = everydayDAO;

