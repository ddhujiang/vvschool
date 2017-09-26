exports.query = {
  hasEDay:"select count(1) num from dynamic where user_id=?",
  getEDay:"select dy.user_id,dy.dynamic_id,dy.img,ic.user_icon_path,info.user_nickname,info.user_self,dy.dy_time,dy.dy_content,dy.like_num,dcomm.sumdcm,dtran.sumdt\n" +
  "from view_icon ic\n" +
  "join user_icon icon\n" +
  "join user_info info\n" +
  "join dynamic dy \n" +
  "join view_dcomm dcomm \n" +
  "join view_dtran dtran\n" +
  "join attention att\n" +
  "on dy.user_id=info.user_id\n" +
  "and dy.user_id=icon.user_id\n" +
  "and icon.user_id=ic.user_id\n" +
  "and dcomm.dynamic_id=dy.dynamic_id\n" +
  "and dtran.dynamic_id=dy.dynamic_id\n" +
  "and ((att.att_by_peo=dy.user_id and att.att_peo=?) or dy.user_id=?)\n" +
  "GROUP BY dy.dynamic_id\n" +
  "order by dy.dy_time desc",
  getEDayBySelf:"select dy.dynamic_id,ic.user_icon_path,info.user_nickname,info.user_self,info.user_id,dy.dy_time,dy.dy_content,dy.like_num,dcomm.sumdcm,dtran.sumdt\n" +
  "from view_icon ic\n" +
  "join user_icon icon\n" +
  "join user_info info\n" +
  "join dynamic dy \n" +
  "join view_dcomm dcomm \n" +
  "join view_dtran dtran\n" +
  "join user u\n" +
  "on dy.user_id=info.user_id\n" +
  "and dy.user_id=icon.user_id\n" +
  "and icon.user_id=ic.user_id\n" +
  "and dcomm.dynamic_id=dy.dynamic_id\n" +
  "and dtran.dynamic_id=dy.dynamic_id\n" +
  "and dy.user_id=?\n" +
  "GROUP BY dy.dynamic_id\n" +
  "order by dy.dy_time desc",


  setEDay:"insert into dynamic(user_id,dy_content,img,dy_time,like_num) VALUES(?,?,?,NOW(),0)",
  deleteEDay:[
    "delete from dcomment where dynamic_id=?",
    "delete from dtranspond where dynamic_id=?",
    "delete from dynamic where dynamic_id=? and user_id=?"
  ],
  getCommentById:"select dcom.user_comm_id,ic.user_icon_path,info.user_nickname,info.user_self,dcom.comm_content,dcom.comm_time ,dcom.comm_id\n" +
  "from view_icon ic \n" +
  "join user_info info \n" +
  "join dcomment dcom\n" +
  "join dynamic dy\n" +
  "on dcom.dynamic_id=dy.dynamic_id\n" +
  "and dcom.user_comm_id=info.user_id\n" +
  "and dcom.user_comm_id=ic.user_id\n" +
  "and dy.dynamic_id=?\n" +
  "order by dcom.comm_time desc",

  setComment:"insert into dcomment(user_comm_id,dynamic_id,comm_content,comm_time) VALUES(?,?,?,NOW())",
  deleteComBySelf:"delete from dcomment where comm_id=? and user_comm_id=?",
  deleteComById:"delete from dcomment where comm_id=?"
}

