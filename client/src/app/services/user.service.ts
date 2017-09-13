import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';  //导入http对象

@Injectable()
export class UserService {
  url:string='http://127.0.0.1:3000/users';
  constructor( private  http:HttpClient) { }         //构建http对象
  login(user,callback){

    this.http.post(this.url+'/login',user).subscribe(function (result) {
      callback(result);
    },
    function (error) {
      console.log(error.message);
    })

  }

  addUser(user,callback){
    this.http.post(this.url+'/register',user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }
  editUser(){

  }
}
