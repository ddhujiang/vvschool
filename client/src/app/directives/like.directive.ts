import {  Directive, ElementRef,HostListener, Input ,OnInit } from '@angular/core';

@Directive({
  selector: '[appLike]',
  providers:[]
})
export class LikeDirective {
  _like=false;
  constructor(private el: ElementRef) {

  }

  ngOnInit() {
  }
  @HostListener('click') onClick() {
    this._like=!this._like;
    this.el.nativeElement.setAttribute('like_count',88);
    var count=parseInt(this.el.nativeElement.childNodes[1].innerHTML);
    if(this._like){
      this.el.nativeElement.style.color = 'rgba(255, 0, 0, 0.6)';
      this.el.nativeElement.childNodes[1].innerHTML=count+1;
    }else{
      this.el.nativeElement.style.color = 'black';
      this.el.nativeElement.childNodes[1].innerHTML=count-1;
    }
  }
}
