import { Component, OnInit } from '@angular/core';
// import {bufferToggle} from "rxjs/operator/bufferToggle";
// import {LikeDirective} from './../../directives/like.directive'

@Component({
  selector: 'app-say-card',
  templateUrl: './say-card.component.html',
  styleUrls: ['./say-card.component.css'],
  providers:[]
})
export class SayCardComponent implements OnInit {
_comment=false;
like_count:number=88;
_like=false;

  constructor() { }
  ngOnInit() {

  }
comments(){
this._comment=!this._comment;
}
like(){
  this._like=! this._like;
  if( this._like){
    this.like_count+=1;
  }else{
    this.like_count-=1;
  }
}

}
