import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css'],
  providers:[UserService]
})
export class RegistComponent implements OnInit {
  regist_res:string ;
  _telephone="13047903160";
  _password="123456";
  _school:string;
  _profession:string;

  constructor(private router:Router,
              private userSer:UserService) { }
 toLogin(){
   this.router.navigate(['login']);
 }
  ngOnInit() {
  }
  toIndex(regist_form){

    let that=this;
    console.log(regist_form.form.value);
    that.userSer.addUser(regist_form.value,function (result) {
      console.log(regist_form.value);
      console.log(result)
      if(result.code=='u200'){
        alert(JSON.stringify(result));
        that.router.navigate(['/index',result.ID]);   //登入成功来到首页
      }else if(result.code=='u101') {
        that.regist_res='用户已存在'
      }

    })

  }

}
