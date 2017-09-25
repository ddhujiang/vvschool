import { Directive, ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appClose]'
})
export class CloseDirective {
  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
    this.el.nativeElement.parentElement.parentElement.style.display='none';
  }
}
