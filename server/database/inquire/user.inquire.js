exports.query = {
  getPasswordById: "select user_pwd from user where user_id=?",
  getPasswordByTel: "select user_pwd ,user_id from user where user_tel=?",
  getIdByTel: "select user_id  from user where user_tel=?",
  // hasTel:'select user_  from user where user_tel=?',
  addUser: "insert into user(user_id,user_tel,user_pwd,school_id,profession_id) values(?,?,?,?,?)",

  getDataById: "select u.profession_id,icon.user_icon_path,user_nickname from user u join user_icon icon join user_info info  where u.user_id=? and u.user_id=info.user_id and u.user_id=icon.user_id and icon.user_icon_id=(select max(user_icon_id) from user_icon where user_id=?)",
  getInfoById:""
};