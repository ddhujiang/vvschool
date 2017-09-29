import { Directive , ElementRef,HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appDeleteComment]'
})
export class DeleteCommentDirective {
  constructor(private el: ElementRef,) { }
  @HostListener('click') onClick(){
      this.el.nativeElement.parentElement.style.display='none';

  }
}
