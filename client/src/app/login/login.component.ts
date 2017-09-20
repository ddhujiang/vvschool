import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
 import {LocalStorageService} from '../services/local-storage.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService]
})
export class LoginComponent implements OnInit {
  userId:string;
  login_res:string;
  _telephone="15060833663";
  _password="123456";
  constructor(private router:Router,
              private userSer:UserService,
               private localstorage:LocalStorageService
              ) { }

  ngOnInit() {
  }
  toRegist(){
    this.router.navigate(['regist']);
  }

  toIndex(login_form){

    let that=this;
    //console.log(login_form.value);
    that.userSer.login(login_form.form.value,function (result) {

      console.log(result)
      if(result.code=='u200'){
        alert(JSON.stringify(result));
        that.localstorage.set('token',result.token);
        alert('token'+that.localstorage.get('token'))
        that.router.navigate(['/index']);   //登入成功来到首页
      }else if(result.code=='u301') {
        that.login_res='用户名不存在'
      }else if(result.code=='u302'){
        that.login_res='用户名或密码错误'
      }
    })

  }
   // getAll(){
   //  let that=this;
   //  that.userSer.getAllUser()
   // }
}
