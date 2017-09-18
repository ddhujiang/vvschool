import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit() {
  }

}
