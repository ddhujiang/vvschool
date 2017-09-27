import { Component, OnInit,Input } from '@angular/core';
 import {IndexService} from '../../services/index.service';  //导入服务
import {UserService} from '../../services/user.service';  //导入服务
import {UpdataService} from '../../services/updata.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[UserService,IndexService,UpdataService]
})
export class CommentComponent implements OnInit {
  @Input() _qus:any;
  user:any;
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;
  _like=false;
  comment:any;
  _com:string;
  toget:boolean=false;
  coll:any;
  next:any;

  constructor(private indexSer:IndexService,private userSer:UserService,private upser:UpdataService
  ) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
        that.user=result.data;
    })
  }


  toSee(){
    let that=this;
    that.isTrue=!that.isTrue;
    that.indexSer.getComment(that._qus.answer.id,function (result) {
      that.comment=result.data;
      that.next=result.next;

    })
  }

  toMorecom(){

  let that=this;

  that.indexSer.getMoreComment(that._qus.answer.id,that.next,function (result){
    console.log(result);
    that.comment=that.comment.concat(result.data)
    that.next=result.next;
  })
}

  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }

  like(){
    let that=this;
    that._like=! that._like;
    if( that._like){
      that._qus.quantity.praise+=1;
      that.indexSer.addLink(that._qus.answer.id,function (result) {
        console.log(result);
      })

    }else{
      that._qus.quantity.praise-=1;
      that.indexSer.delLink(that._qus.answer.id,function (result) {
        console.log(result);
      })
    }
  }

  toCom(_com){
     this.toget=true;
    this._like=! this._like;
    if( this._like){
      this._qus.quantity.comment+=1;
    }else{
      this._qus.quantity.comment-=1;
    }
    let that=this;
    that.indexSer.putCom(that._qus.answer.id,_com,function(result){
      console.log(result);
      alert(result)
    })
  }

  toColl(_id){

    this._like=! this._like;
    if( this._like){
      this._qus.quantity.collect+=1;
      let that=this;
      that.upser.addColl( _id,function (result) {
        alert(_id);
        that.coll=result.data;
        console.log(result);
      })

    }else{
      this._qus.quantity.collect-=1;
      let that=this;
      that.upser.delColl( _id,function (result) {
        alert(_id);
        that.coll=result.data;
        console.log(result);
      })
    }



  }

}
