exports.query = {
  getPasswordById: "select user_pwd from user where user_id=?",
  getPasswordByTel: "select user_pwd ,user_id from user where user_tel=?",
  getIdByTel: "select user_id  from user where user_tel=?",
  // hasTel:'select user_  from user where user_tel=?',
  addUser: [
    "insert into user(user_id,user_tel,user_pwd,school_id,profession_id) values(?,?,?,?,?)",
    "insert into user_icon(user_id,user_icon_path) values(?,?)",
    "insert into user_info(user_id,user_nickname,regdate) VALUES(?,?,NOW())\n"
  ],

  getDataById: "select u.profession_id,icon.user_icon_path,user_nickname from user u join user_icon icon join user_info info  where u.user_id=? and u.user_id=info.user_id and u.user_id=icon.user_id and icon.user_icon_id=(select max(user_icon_id) from user_icon where user_id=?)",
  getInfoById:["select icon.user_icon_id,prof.profession_name,icon.user_icon_path,info.user_self,info.user_nickname\n" +
  "from user u \n" +
  "join profession prof \n" +
  "join user_info info \n" +
  "join user_icon icon \n" +
  "on u.user_id=info.user_id \n" +
  "and u.user_id=icon.user_id \n" +
  "and u.profession_id=prof.profession_id \n" +
  "and u.user_id=? \n" +
  "and icon.user_icon_id=(select max(icon.user_icon_id) from user_icon icon where icon.user_id=?)\n" +
  "group by icon.user_icon_id",
    "select count(1) by_att from attention att where att.att_by_peo=?",
    "select count(1) att from attention att where att.att_peo=?",
    "select count(1) count from problem p where p.iss_id=?",
    "select count(1) count from answer a where a.user_ans_id=? "],

  getSearchByKeyName:"select info.user_nickname,icon.user_icon_path,info.user_id id,info.user_self,prof.profession_name \n" +
  "from user_info info \n" +
  "join profession prof \n" +
  "join user u\n" +
  "join view_icon icon\n" +
  "on u.user_id=info.user_id \n" +
  "and u.profession_id=prof.profession_id\n" +
  "and u.user_id=icon.user_id\n" +
  "and info.user_nickname regexp ?",

  getQuestionByUId:"select p.prob_id,p.prob_title,p.prob_content,p.prob_time,an.sumdan from problem p join view_answ an\n" +
  "  on p.iss_id=?\n" +
  "  and an.prob_id=p.prob_id\n" +
  "ORDER BY p.prob_time desc",

  getAnswerByUId:"select p.prob_id,p.prob_content,p.prob_title,p.prob_time,a.answer_id,a.ans_content,a.ans_time,comm.sumcm,a.like_num,tran.sumt,coll.sumc\n" +
  "from problem p \n" +
  "join answer a \n" +
  "join user u\n" +
  "join view_comm comm\n" +
  "join view_coll coll\n" +
  "join view_tran tran\n" +
  "on p.prob_id=a.prob_id\n" +
  "and u.user_id=a.user_ans_id \n" +
  "and u.user_id=?\n" +
  "and a.answer_id=comm.answer_id\n" +
  "and a.answer_id=coll.answer_id\n" +
  "and a.answer_id=tran.answer_id\n" +
  "ORDER BY ?? desc",

  queryIcon:"SELECT icon.user_icon_path from user_icon icon where icon.user_id=? order by icon.user_icon_id desc",
  addIcon:"insert into user_icon(user_id,user_icon_path)value(?,?)",
  addName:"update user_info info set info.user_nickname=? where info.user_id=?",
  addDescribe:"update user_info info set info.user_self=? where info.user_id=?"
};