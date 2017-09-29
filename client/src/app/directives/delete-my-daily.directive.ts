import { Directive , ElementRef,HostListener} from '@angular/core';

@Directive({
  selector: '[appDeleteMyDaily]'
})
export class DeleteMyDailyDirective {
  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
      this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.style.display='none';
  }
}
