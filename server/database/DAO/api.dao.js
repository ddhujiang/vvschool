var pool = require("./../db.pool").pool;
var inquire = require("./../inquire/api.inquire").query;


var apiDAO = {
  iconUpload: function (arg, cb) {
    pool.getConnection(function (err, client) {
      if (err) {
        console.error("iconUpload: " + err.message);
        cb("err501");
        return;
      }
      client.query(inquire.iconUpload, [arg.ID,arg.file.filename], function (err, result) {
        if (err) {
          cb("err501");
          console.error("iconUpload: " + err.message);
          return;
        }
        cb(result.affectedRows===1?"f200":"f301");
        client.release();
      });
    });
  }

};

exports.apiDAO = apiDAO;