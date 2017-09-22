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
  getInfoByAsnId:function (id,cb) {
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
        console.log(result);
        cb(result);
        client.release();
      });
    });
  },
  getMoreByQueId:function (ansId,queId,cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("getMoreByQueId: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.getMoreByQueId, [ansId,queId], function (err, result) {
        if (err) {
          cb("err501");
          console.error("getMoreByQueId: " + err.message);
          return;
        }
        console.log(result);
        cb(result);
        client.release();
      });
    });
  }
};

exports.questionDAO = questionDAO;