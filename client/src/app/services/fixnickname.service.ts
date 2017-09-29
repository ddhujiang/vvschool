import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';  //导入http对象
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class FixnicknameService {
  url: string = 'http://127.0.0.1:3000/users';

  constructor(private  http: HttpClient,
              private  ls: LocalStorageService) {
  }         //构建http对象


  fixnickname(nickname,callback) {
    const body = {"name":nickname};
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/addName', body,{headers: _head}).subscribe(function (result) {
        console.log("fw",result,"end");
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }
}
