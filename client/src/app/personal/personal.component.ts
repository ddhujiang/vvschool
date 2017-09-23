import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块

import {UserService} from '../services/user.service';  //导入服务
import {IndexService} from '../services/index.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers:[UserService,
    IndexService]

})
export class PersonalComponent implements OnInit {
  user_name:any;
  qus:any;
  info:any;
  constructor( private router:Router,
               private userSer:UserService) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
      if(result.code=='u200'||result.code=="u402"){
        that.user_name=result.data.name;
      }else {
        that.router.navigate(['login']);
      }
    })
     that.userSer.getInfo(function (result) {
       that.info=result.data;
     })
  }

}
