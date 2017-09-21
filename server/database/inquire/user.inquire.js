exports.query = {
  getPasswordById: "select user_pwd from user where user_id=?",
  getPasswordByTel: "select user_pwd ,user_id from user where user_tel=?",
  getIdByTel: "select user_id  from user where user_tel=?",
  // hasTel:'select user_  from user where user_tel=?',
  addUser: "insert into user(user_id,user_tel,user_pwd,school_id,profession_id) values(?,?,?,?,?)",

  getDataById: "select u.profession_id,icon.user_icon_path,user_nickname from user u join user_icon icon join user_info info  where u.user_id=? and u.user_id=info.user_id and u.user_id=icon.user_id and icon.user_icon_id=(select max(user_icon_id) from user_icon where user_id=?)",
  getInfoById:["select icon.user_icon_id,prof.profession_name,icon.user_icon_path,info.user_self,info.user_nickname\n" +
  "from user u \n" +
  "join profession prof \n" +
  "join user_info info \n" +
  "join user_icon icon \n" +
  "join problem p \n" +
  "join answer a \n" +
  "on u.user_id=info.user_id \n" +
  "and u.user_id=icon.user_id \n" +
  "and u.user_id=p.iss_id \n" +
  "and u.user_id=a.user_ans_id \n" +
  "and u.profession_id=prof.profession_id \n" +
  "and u.user_id=? \n" +
  "and icon.user_icon_id=(select max(icon.user_icon_id) from user_icon icon where icon.user_id=?)\n" +
  "group by icon.user_icon_id\n","select count(1) by_att from attention att where att.att_by_peo=?","select count(1) att from attention att where att.att_peo=?"]
};