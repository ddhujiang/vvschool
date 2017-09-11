import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router ) { }

  ngOnInit() {
  }

}
