import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appModifyNickName]'
})
export class ModifyNickNameDirective {

  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
    this.el.nativeElement.nextElementSibling.style.display='inline-block';
  }
}
