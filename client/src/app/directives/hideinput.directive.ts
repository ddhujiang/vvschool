import { Directive , ElementRef,HostListener} from '@angular/core';

@Directive({
  selector: '[appHideinput]'
})
export class HideinputDirective {

  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
    this.el.nativeElement.parentElement.previousElementSibling.previousElementSibling.children[3].style.display='none';
  }

}
