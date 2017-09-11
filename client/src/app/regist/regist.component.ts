import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css'],

})
export class RegistComponent implements OnInit {

  constructor(private router:Router) { }
 toLogin(){
   this.router.navigate(['login']);
 }
  ngOnInit() {
  }

}
