import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appDeleteDaily]'
})
export class DeleteDailyDirective {
  _close=false;
  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
    this._close=!this._close;
    if(this._close){
      this.el.nativeElement.nextElementSibling.style.display='block';
    }else{
      this.el.nativeElement.nextElementSibling.style.display='none';
    }
  }
}
