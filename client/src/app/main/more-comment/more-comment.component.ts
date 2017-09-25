import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-more-comment',
  templateUrl: './more-comment.component.html',
  styleUrls: ['./more-comment.component.css']
})
export class MoreCommentComponent implements OnInit {
  @Input() _detail:any;
  constructor() { }
  isTrue:boolean=false;
  _like=false;
  ngOnInit() {
  }
  toSee(){
    this.isTrue=!this.isTrue;
  }

  like(){
    this._like=! this._like;
    if( this._like){
      this._detail.quantity.praise+=1;
    }else{
      this._detail.quantity.praise-=1;
    }
  }

}
