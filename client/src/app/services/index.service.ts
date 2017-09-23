import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';  //导入http对象
import {LocalStorageService} from './local-storage.service';
@Injectable()
export class IndexService {
  url: string = 'http://127.0.0.1:3000/question';
  constructor(private  http: HttpClient,
              private  ls: LocalStorageService) {}
  getAnswerer(callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.get(this.url + '/index',{headers: _head}).subscribe(function (result) {

        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }
  getQus(title,link,profession,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/put',{"title":title,"link":link,"profession":profession},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

}
