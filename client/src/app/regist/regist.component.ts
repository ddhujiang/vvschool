import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
import {LocalStorageService} from '../services/local-storage.service'

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
  _repassword="123456";
  _school="东华理工大学";
  _profession="计算机专业";

  constructor(private router:Router,
              private userSer:UserService,
              private localstorage:LocalStorageService) { }
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
        that.localstorage.set('token',result.token);
        that.localstorage.set('id',result.ID);
        // alert('token'+that.localstorage.get('token'))
        alert(that.localstorage.get('id'))
        that.router.navigate(['/index']);   //登入成功来到首页
      }else if(result.code=='u101') {
        that.regist_res='用户已存在'
      }else if(result.code=='err501'){
        that.regist_res='请选择学校和专业'
      }

    })

  }

}
