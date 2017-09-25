exports.query = {
  hasFollower:[
    "select count(1) att from attention att where att.att_peo=?",
    "select count(1) by_att from attention att where att.att_by_peo=?"
  ],
  isFollower:"select att_id from attention where attention.att_peo=? and attention.att_by_peo=?",
  addFollower:[
    "select att_id from attention where attention.att_peo=? and attention.att_by_peo=?",
    "insert into attention(att_peo,att_by_peo) values(?,?)"
  ],
  deleteFollower:[
    "select att_id from attention where attention.att_peo=? and attention.att_by_peo=?",
    "delete from attention where att_peo=? and att_by_peo=?"
  ],

  getCollect:"select p.prob_id,p.prob_content,p.prob_time,a.answer_id,a.ans_time,a.user_ans_id,icon.user_icon_path,max(icon.user_icon_id) ic_id,prof.profession_name,info.user_nickname,info.user_self,p.prob_title,a.ans_content,comm.sumcm,a.like_num,sumt,sumc \n" +
  "from profession prof \n" +
  "join user u\n" +
  "join user_info info \n" +
  "join problem p \n" +
  "join answer a \n" +
  "join collect coll\n" +
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
  "and coll.user_col_id=?\n" +
  "and coll.answer_id=a.answer_id \n" +
  "group by answer_id\n" +
  "order by coll.col_time desc"
};