exports.query = {
  getListByPro: "select p.prob_id,p.prob_time,a.answer_id,a.user_ans_id,icon.user_icon_path,prof.profession_name,info.user_nickname,info.user_self,p.prob_title,a.ans_content,a.ans_time,sumcm,a.like_num,sumt,sumc \n" +
  "  from profession prof\n" +
  "  join user u\n" +
  "  join user_info info \n" +
  "  join problem p \n" +
  "  join answer a \n" +
  "  join user_icon icon\n" +
  "  join view_comm comm\n" +
  "  join view_icon ic\n" +
  "  join (select vt.answer_id,sumt,sumc from view_tran vt join view_coll vc on vc.answer_id=vt.answer_id ) temp\n" +
  "  on  a.prob_id=p.prob_id \n" +
  "  and info.user_id=a.user_ans_id \n" +
  "  and a.user_ans_id=u.user_id\n" +
  "  and a.answer_id=temp.answer_id \n" +
  "  and a.answer_id=comm.answer_id\n" +
  "  and icon.user_id=a.user_ans_id \n" +
  "  and ic.user_icon_id=icon.user_icon_id\n" +
  "  and p.profession_id=(select profession_id from user where user.user_id=? ) \n" +
  "  and prof.profession_id=p.profession_id \n" +
  "  group by a.answer_id\n" +
  "  order by p.prob_id  desc,a.like_num desc",

  getInfoByAsnId: "select p.prob_id,p.prob_time,a.answer_id,a.user_ans_id,a.ans_time,icon.user_icon_path,p.prob_content,prof.profession_name,info.user_nickname,info.user_self,p.prob_title,a.ans_content,comm.sumcm,a.like_num,sumt,sumc \n" +
  "from profession prof \n" +
  "join user u\n" +
  "join user_info info\n" +
  "join problem p \n" +
  "join answer a \n" +
  "join user_icon icon \n" +
  "join view_icon ic \n" +
  "join view_comm comm\n" +
  "join (select vt.answer_id,sumt,sumc from view_tran vt join view_coll vc on vc.answer_id=vt.answer_id ) temp\n" +
  "on  a.prob_id=p.prob_id\n" +
  "and info.user_id=a.user_ans_id \n" +
  "and a.user_ans_id=u.user_id\n" +
  "and a.answer_id=temp.answer_id \n" +
  "and ic.user_icon_id=icon.user_icon_id \n" +
  "and icon.user_id=a.user_ans_id \n" +
  "and a.user_ans_id=info.user_id \n" +
  "and comm.answer_id=a.answer_id \n" +
  "and a.answer_id=? \n" +
  "GROUP BY a.answer_id",

  getMoreByQueId: "select p.prob_id,p.prob_time,p.prob_title,p.prob_content,a.answer_id,a.user_ans_id,a.ans_time,icon.user_icon_path,prof.profession_name,info.user_nickname,info.user_self,a.ans_content,sumcm,a.like_num,sumt,sumc \n" +
  "from profession prof \n" +
  "join user u\n" +
  "join user_info info \n" +
  "join problem p \n" +
  "join answer a \n" +
  "join view_comm comm\n" +
  "join user_icon icon \n" +
  "join view_icon ic\n" +
  "join (select vt.answer_id,sumt,sumc from view_tran vt join view_coll vc on vc.answer_id=vt.answer_id ) temp\n" +
  "on  a.prob_id=p.prob_id \n" +
  "and info.user_id=a.user_ans_id \n" +
  "and comm.answer_id=a.answer_id\n" +
  "and a.user_ans_id=u.user_id\n" +
  "and a.answer_id=temp.answer_id \n" +
  "and icon.user_id=a.user_ans_id \n" +
  "and a.user_ans_id=info.user_id\n" +
  "and a.user_ans_id=u.user_id\n" +
  "and u.profession_id=prof.profession_id\n" +
  "and p.prob_id=? \n" +
  "and a.answer_id!=? \n" +
  "and ic.user_icon_id=icon.user_icon_id\n" +
  "group by a.answer_id\n" +
  "ORDER BY a.like_num desc",

  getSearchByKey: "select p.prob_id,p.prob_time,p.prob_content,a.answer_id,a.user_ans_id,a.ans_time,icon.user_icon_path,max(icon.user_icon_id) ic_id,prof.profession_name,info.user_nickname,info.user_self,p.prob_title,a.ans_content,comm.sumcm,a.like_num,sumt,sumc \n" +
  "from profession prof \n" +
  "join user u\n" +
  "join user_info info \n" +
  "join problem p \n" +
  "join answer a\n" +
  "join user_icon icon \n" +
  "join view_comm comm\n" +
  "join (select vt.answer_id,sumt,sumc from view_tran vt join view_coll vc on vc.answer_id=vt.answer_id ) temp\n" +
  "on  a.prob_id=p.prob_id \n" +
  "and info.user_id=a.user_ans_id \n" +
  "and a.user_ans_id=u.user_id\n" +
  "and a.answer_id=temp.answer_id \n" +
  "and icon.user_id=a.user_ans_id\n" +
  "and a.user_ans_id=info.user_id\n" +
  "and comm.answer_id=a.answer_id\n" +
  "and prof.profession_id=p.profession_id \n" +
  "and p.prob_title regexp ? \n" +
  "group by p.prob_id\n" +
  "order by ?? desc",

  setQuestion:" insert into problem(iss_id,prob_title,profession_id,prob_content,prob_time) values(?,?,?,?,now())",

  addLikeNum:"update answer a\n" +
  " set a.like_num=a.like_num+(?)\n" +
  " where a.answer_id=?"

};


