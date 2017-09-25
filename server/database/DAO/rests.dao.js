var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

/*连接数据库池*/
var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/rests.inquire").query;


var restsDAO = {
  hasFollower:function (id,cb) {
    sqlclient.queries(inquire.hasFollower,[[id],[id]],function (err,results) {
      if (!!err) {
        console.error("addFollower: " + err.message);
        cb("err501");
      } else {
        cb(results);
      }
    });
  },
  isFollower: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("isFollower: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.isFollower, [req.ID, req.body.id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("isFollower: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  },
  addFollower: function (req, cb) {
    sqlclient.queries(inquire.addFollower, [[req.ID, req.body.id],[req.ID, req.body.id]], {
      skip: function (i, arg, results) {
        var skip = false;
        switch (i) {
          case 1:
            //handle second SQL
            //Execute the second SQL depending on the first SQL result.
            skip = results[0].length !== 0;
            break;
        }
        return skip;
      }
    }, function (err, results) {
      if (!!err) {
        console.error("addFollower: " + err.message);
        cb("err501");
      } else {
        cb(results);
      }
    });
  },
  deleteFollower: function (req, cb) {
    sqlclient.queries(inquire.deleteFollower, [[req.ID, req.body.id],[req.ID, req.body.id]], {
      skip: function (i, arg, results) {
        var skip = false;
        switch (i) {
          case 1:
            //handle second SQL
            //Execute the second SQL depending on the first SQL result.
            skip = results[0].length === 0;
            break;
        }
        return skip;
      }
    }, function (err, results) {
      if (!!err) {
        console.error("deleteFollower: " + err.message);
        cb("err501");
      } else {
        cb(results);
      }

    });
  },

  getCollect:function (id,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getCollect: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getCollect, [id], function (err, result) {
        if (!!err) {
          cb("err501");
          console.error("getCollect: " + err.message);
        } else {cb(result);}
        client.release();
      });
    });
  }
};


exports.restsDAO = restsDAO;

