var dbCfg = require("./../../website.config").websizeCfg.sql;
/*查询多条SQLs*/
var sqlclient = require("mysql-queries").init(dbCfg);

var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/question.inquire").query;


var questionDAO = {
  getListByPro: function (ID, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getListByPro: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getListByPro, [ID], function (err, result) {
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
  getInfoByAsnId: function (id, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getInfoByAsnId: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getInfoByAsnId, [id], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getInfoByAsnId: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getMoreByQueId: function (req, cb) {
    sqlclient.queries(inquire.getMoreByQueId,[
      [req.body.queId, req.body.ansId ? req.body.ansId : 0, req.body.sort ? "a.ans_time" : "a.like_num"],
      [req.body.queId]
    ],{
      skip:function(i, arg, results) {
        var skip = false;
        switch(i) {
          case 1:
            skip = results[0].length!==0;
            break;
        }
        return skip;
      }
    },function (err,results) {
      if (!!err) {
        cb("err501");
        console.error("getMoreByQueId: " + err.message);
        return;
      }
      cb(results);
    });
  },
  getSearchByKey: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getSearchByKey: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getSearchByKey, [req.body.keyword, req.body.sort ? "p.prob_id" : "a.like_num"], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getSearchByKey: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  setQuestion: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("setQuestion: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.setQuestion, [req.ID, req.body.title, req.body.profession, req.body.link], function (err, result) {
        if (err) {
          cb("err501");
          console.error("setQuestion: " + err.message);
          return;
        }
        if (result.affectedRows === 1) {
          cb("q200");
        } else {
          cb("q404");
        }
        client.release();
      });
    });
  },
  addLikeNum: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addLikeNum: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addLikeNum, [req.body.value < 0 ? -1 : 1, req.body.id], function (err, result) {
        if (err) {
          cb("err501");
          console.error("addLikeNum: " + err.message);
          return;
        }
        if (result.affectedRows === 1) {
          cb("q201");
        } else {
          cb("q404");
        }
        client.release();
      });
    });
  },
  addReply: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addReply: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addReply, [req.ID, req.body.id, req.body.link], function (err, result) {
        if (err) {
          cb("err501");
          console.error("addReply: " + err.message);
          return;
        }
        if (result.affectedRows === 1) {
          cb("q208");
        } else {
          cb("q404");
        }
        client.release();
      });
    });
  },
  getCommentByAnsId: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addReply: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getCommentByAnsId, [req.body.id, req.body.link], function (err, results) {
        if (err) {
          cb("err501");
          console.error("getCommentByAnsId: " + err.message);
          return;
        }
        cb(results);
        client.release();
      });
    });
  },
  addComment:function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("addComment: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.addComment, [req.ID, req.body.id, req.body.link], function (err, result) {
        if (err) {
          cb("err501");
          console.error("addComment: " + err.message);
          return;
        }
        if (result.affectedRows === 1) {
          cb("q207");
        } else {
          cb("q404");
        }
        client.release();
      });
    });
  },

  getMajorQ: function (req, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getMajorQ: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getMajorQ, [req.ID,req.body.sort?"sumdan":"prob.prob_time"], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getSearchByKey: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
  getHotQ: function (sort, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getHotQ: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getHotQ, [sort?"prob_time":"an.sumdan"], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getHotQ: " + err.message);
          return;
        }
        cb(result);
        client.release();
      });
    });
  },
};

exports.questionDAO = questionDAO;