import { Component, OnInit,Input } from '@angular/core';
import { PushCommentService } from './../../services/push-comment.service';
import {DailyGetCommentsService} from './../../services/daily-get-comments.service';


@Component({
  selector: 'app-publish-comments',
  templateUrl: './publish-comments.component.html',
  styleUrls: ['./publish-comments.component.css'],
  providers:[PushCommentService,DailyGetCommentsService]
})
export class PublishCommentsComponent implements OnInit {
@Input() _info:any;
@Input() _oneDaily:any;
@Input() com:any;
  _comments:any;
  constructor(private pushComment:PushCommentService,
              private  dailygetcomments:DailyGetCommentsService,
  ) { }


  ngOnInit() {
    const that=this;
    that.dailygetcomments.getComments(that._oneDaily.everyday.id,function (result) {
      that._comments=result.data;
      if(result.code==="e200"){
        that._comments=result.data;
      }else if(result.code==="e302"){
        that._comments=result.data;
      } else {
        alert("错误");
      }
    });
  }

  commentText:any;
  deliverComment(text){
    const that=this;
this.pushComment.pushComm(text,that._oneDaily.everyday.id,function (result) {
if(result.code='e200'){
  that.dailygetcomments.getComments(that._oneDaily.everyday.id,function (result) {
    that._comments=result.data;
    if(result.code==="e200"){
      that._comments=result.data;
    }else if(result.code==="e302"){
      that._comments=result.data;
    } else {
      alert("错误");
    }
  });

  that.commentText='';
}else{
  console.log('错误');
}

})
  }
}
