import { Directive,ElementRef,HostListener, } from '@angular/core';

@Directive({
  selector: '[apphoverProfile]'
})
export class HoverProfileDirective {
  constructor(private el: ElementRef,) { }
  @HostListener('mouseover') onMouseOver(){
    this.el.nativeElement.style.display='block';
    this.el.nativeElement.style.cursor='pointer';

  }
  @HostListener('mouseout') onMouseOut(){
    this.el.nativeElement.style.display='none';
  }
}
