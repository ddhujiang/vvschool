import {  Directive, ElementRef,HostListener, Input ,OnInit } from '@angular/core';
import  {SayCardComponent} from '../personal/say-card/say-card.component';

@Directive({
  selector: '[appLike]',
  providers:[SayCardComponent]
})
export class LikeDirective {
  _like=false;
  constructor(private el: ElementRef,private sayCard:SayCardComponent) {

  }

  ngOnInit() {
  }
  @HostListener('click') onClick() {
    this._like=!this._like;
    this.el.nativeElement.setAttribute('like_count',88);
    if(this._like){
      this.el.nativeElement.style.color = 'rgba(255, 0, 0, 0.6)';
      this.el.nativeElement.like_count+=1;
    }else{
      this.el.nativeElement.style.color = 'black';
      this.el.nativeElement.like_count-=1;
    }
  }
}
