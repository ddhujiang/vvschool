var jwt = require("jwt-simple");
var moment = require("moment");
var key = require("./../website.config").websizeCfg.privateKey;
var token = {
  jwtEn: function (setting) {
    return jwt.encode(setting, key);
  },
  jwtDe: function (token) {
    return jwt.decode(token, key);
  },
  power: function (req, res, next) {
    try {
      var token = jwt.decode(req.header("token"), key);
      if(!token.iss){
        res.json({"code": "err604"});
      }else if(token.exp-moment().valueOf()<=0){
        res.json({"code": "err602"});
      }else {
        req.ID=token.iss;
        next();
      }
    } catch (err) {
      console.log("power:"+err.message);
      res.json({"code": "err604"});
    }
  }
};
/*测试数据*/
console.log(token.jwtEn({
  iss:"10020",
  exp:moment().add(1,"y").valueOf()
}));
module.exports = token;