import { Directive, ElementRef,HostListener, } from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private el: ElementRef,) { }
  @HostListener('mouseenter') onMouseEnter(){
    this.el.nativeElement.parentElement.nextElementSibling.style.display='block';
    this.el.nativeElement.style.cursor='pointer';
  }
  @HostListener('mouseout') onMouseOut(){
      this.el.nativeElement.parentElement.nextElementSibling.style.display='none';
  }
}
