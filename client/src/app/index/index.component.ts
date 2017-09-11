import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {


  constructor(
    private route: Router,
  ) {

  }

  ngOnInit() {

  }

}
