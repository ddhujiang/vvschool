import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appMyhide]'
})
export class MyhideDirective {
  _hide=false;
  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
    this._hide=!this._hide;
    var container=this.el.nativeElement.parentElement.parentElement.parentElement.parentElement;
    if(this._hide){
      container.style.opacity=0;
      container.nextElementSibling.className='showup';
      container.nextElementSibling.innerHTML='显现';
      container.nextElementSibling.onclick=function () {
          container.style.opacity=1;
          container.nextElementSibling.className='';
          container.nextElementSibling.innerHTML='';
      }
      this._hide=!this._hide;
    }else{
      this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.style.opacity=1;
      container.nextElementSibling.className='';
      container.nextElementSibling.innerHTML='';
    }
  }
}
