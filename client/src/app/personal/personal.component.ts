import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
import {UpdataService} from '../services/updata.service';  //导入服务

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers:[UserService,UpdataService]
})
export class PersonalComponent implements OnInit {
  // user_name:any;
  user_id:any;
  info:any;
  // number:any;
  constructor( private router:Router,
               private userSer:UserService) { }

  ngOnInit() {
    let that=this;
    that.userSer.getInfo(function (result) {
      that.info=result.data;
      console.log(result);
    });

    that.userSer.getAllUser(function (result) {
      if(result.code=='u200'||result.code=="u402"){
        // that.user_name=result.data.name;
        that.user_id=result.data.id;
      }else {
        that.router.navigate(['login']);
      }
    })
  }

}
