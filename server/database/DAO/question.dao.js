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
  }
};

exports.questionDAO = questionDAO;