import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';  //导入http对象
@Injectable()
export class DetailService {
  url: string = 'http://127.0.0.1:3000/question';
  _detail:any;
  constructor(private  http: HttpClient,) { }
  getDetail(id,callback) {

    this.http.post(this.url + '/info', {"id":id}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })

  }
  getMore(queId,ansId,callback){
    this.http.post(this.url + '/more', {"queId":queId,"ansId":ansId}).subscribe(function (result) {
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



}
