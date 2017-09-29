import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';  //导入http对象
import {LocalStorageService} from './local-storage.service';
@Injectable()
export class DetailService {
  url: string = 'http://127.0.0.1:3000/question';
  _detail:any;
  constructor(private  http: HttpClient, private  ls: LocalStorageService) { }
  getDetail(id,callback) {
    this.http.post(this.url + '/info', {"id":id}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }
  getMore(queId,ansId,callback) {
    this.http.post(this.url + '/more', {"queId": queId, "ansId": ansId}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


  getAllqus(queId,callback) {
    this.http.post(this.url + '/more', {"queId": queId}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


  getmyQus(queId,callback){
    this.http.post(this.url + '/more', {"queId":queId}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }



  getSearch(keyword,callback){
    this.http.post(this.url + '/search',{"keyword":keyword}).subscribe(function (result) {
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


  recommendQus(callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/getMajorQ',{},{headers: _head} ).subscribe(
      function (result) {
        console.log(result);
        callback(result);
      }, function (error) {
        console.log(error.message);
      }
    )
  }

  hotQus(callback) {
    this.http.post(this.url + '/getHotQ',{'sort':'time'}).subscribe(
      function (result) {
        console.log(result);
        callback(result);
      }, function (error) {
        console.log(error.message);
      }
    )
  }






}
