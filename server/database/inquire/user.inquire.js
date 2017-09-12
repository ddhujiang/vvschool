exports.query={
  getPasswordById:'select user_pwd from user where user_id=?',
  getPasswordByTel:'select user_pwd ,user_id from user where user_tel=?',
  getIdByTel:'select user_id  from user where user_tel=?',
  // hasTel:'select user_  from user where user_tel=?',
  addUser:'insert into user(user_id,user_tel,user_pwd,school_id,profession_id) values(?,?,?,?,?)',
  createToken:'update user set token=? where telephone=?'
};