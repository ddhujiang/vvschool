import { Component, OnInit,Input } from '@angular/core';
 import {IndexService} from '../../services/index.service';  //导入服务

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  providers:[IndexService]
})
export class CommentComponent implements OnInit {
  @Input() _qus:any;

  constructor(private indexSer:IndexService
  ) { }
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;
  _like=false;
  comment:any;
  isComment:boolean=false;
  ngOnInit() {
  }


  toSee(){
    let that=this;
    that.isTrue=!that.isTrue;
    // alert(this._qus.answer.id);
    that.indexSer.getComment(that._qus.answer.id,function (result) {
      alert(result)
      if(result.code=='q302'){
        that.isComment=true;
        that.comment=result.data;
      }else if(result.code=='q207') {
        that.isComment=false;
      }
    })
  }

  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }


  like(){
    this._like=! this._like;
    if( this._like){
      this._qus.quantity.praise+=1;
    }else{
      this._qus.quantity.praise-=1;
    }
  }

}
