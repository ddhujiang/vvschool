import { Component, OnInit,Input } from '@angular/core';
// import {DetailService} from '../../services/detail.service';  //导入服务

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() _qus:any;

  constructor(
  ) { }
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;
  _like=false;
  ngOnInit() {
  }
  toSee(){
    this.isTrue=!this.isTrue;
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
