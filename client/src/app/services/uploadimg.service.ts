import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';  //导入http对象

import {LocalStorageService} from './local-storage.service';
@Injectable()
export class UploadimgService {


  url: string = 'http://127.0.0.1:3000/users';

  constructor(private  http: HttpClient,
              private  ls: LocalStorageService) {
  }         //构建http对象

  pushsrc(img,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    const body={"src":img};
    this.http.post(this.url + '/addIcon', body,{headers: _head}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })


  }

}
