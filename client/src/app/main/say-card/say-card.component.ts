import { Component, OnInit,Input} from '@angular/core';
import {UserService} from './../../services/user.service';
import {DeleteDailyService} from './../../services/delete-daily.service';
import {LikeSerService} from './../../services/like-ser.service';
// import {OthersCommentsComponent} from './../others-comments/others-comments.component';


@Component({
  selector: 'app-say-card',
  templateUrl: './say-card.component.html',
  styleUrls: ['./say-card.component.css'],
  providers:[UserService,DeleteDailyService,LikeSerService]
})
export class SayCardComponent implements OnInit{
_comment=false;
@Input() _onesay:any;
myInfo:any;
// data:any;
  constructor(
                 private userSer:UserService,
                 private  deleteDaily:DeleteDailyService,
                 private  _like:LikeSerService,
                 // private  otherComment:OthersCommentsComponent,
  ) { }
  ngOnInit() {
    const that=this;
    that.userSer.getInfo(function (result) {
      that.myInfo=result.data;
    })

  }


comments(){
this._comment=!this._comment;
}

delete(){
    this.deleteDaily.deleteMyDaily(this._onesay.everyday.id,function () {

    })

  }

  like=false;
param:number;
  ILike(){
this.like=!this.like;
if(this.like){
this.param=1;
}else{
  this.param=-1;
}
this._like.doYoulike(this._onesay.everyday.id,this.param,function () {

})
  }
}
