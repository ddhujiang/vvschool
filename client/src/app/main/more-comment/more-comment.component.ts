import { Component, OnInit,Input } from '@angular/core';
import {IndexService} from '../../services/index.service';  //导入服务
import {UserService} from '../../services/user.service';  //导入服务
import {UpdataService} from '../../services/updata.service';
@Component({
  selector: 'app-more-comment',
  templateUrl: './more-comment.component.html',
  styleUrls: ['./more-comment.component.css'],
  providers:[UserService,IndexService,UpdataService]
})
export class MoreCommentComponent implements OnInit {
  @Input() _detail:any;
  comment:any;
  isTrue:boolean=false;
  _like=false;
  _com:string;
  toget:boolean=false;
  user:any;
  coll:any;

  constructor(private userSer:UserService,private indexSer:IndexService,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
      that.user=result.data;
    })
  }

  toSee(){
    let that=this;
    that.isTrue=!that.isTrue;
    that.indexSer.getComment(that._detail.answer.id,function (result) {
      that.comment=result.data;
    })
  }

  like(){
    this._like=! this._like;
    if( this._like){
      this._detail.quantity.praise+=1;
    }else{
      this._detail.quantity.praise-=1;
    }
  }

  toCom(_com){
    this.toget=true;
    this._like=! this._like;
    if( this._like){
      this._detail.quantity.comment+=1;
    }else{
      this._detail.quantity.comment-=1;
    }

    let that=this;
    that.indexSer.putCom(that._detail.answer.id,_com,function(result){
      console.log(result);
      alert(result)
    })

  }

  toColl(_id){

    this._like=! this._like;
    if( this._like){
      this._detail.quantity.collect+=1;
      let that=this;
      that.upser.addColl( _id,function (result) {
        alert(_id);
        that.coll=result.data;
        console.log(result);
      })

    }else{
      this._detail.quantity.collect-=1;
      let that=this;
      that.upser.delColl( _id,function (result) {
        alert(_id);
        that.coll=result.data;
        console.log(result);
      })
    }



  }

}
