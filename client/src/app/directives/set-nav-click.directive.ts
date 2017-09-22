import { Directive,ElementRef,HostListener,OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Directive({
  selector: '[appSetNavClick]'
})
export class SetNavClickDirective {
  constructor(private el: ElementRef,private router: Router,) { }

  @HostListener('click') onClick() {
    var elem=this.el.nativeElement.parentNode.children;
    for(var i=0;i<elem.length;i++){
      elem[i].className='';
    }
    this.el.nativeElement.className='active';
    // alert(this.el.nativeElement.firstElementChild.getAttribute('routerLink'));
  }
  ngOnInit() {
    if(this.el.nativeElement.className=='active'){
      this.router.navigate(['/set'+this.el.nativeElement.firstElementChild.getAttribute('routerLink').substring(1)+'']);
    }
  }
}
