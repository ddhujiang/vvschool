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
    this.http.post(this.url + '/index',{},{headers: _head}).subscribe(function (result) {

        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  getMoreAnswerer(next,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/index',{"start":next},{headers: _head}).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }









  getQus(title,link,profession,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/put', {
      "title": title,
      "link": link,
      "profession": profession
    }, {headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  getComment(id,callback){
    this.http.post(this.url + '/comment',{"id":id}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  getMoreComment(id,value,callback){
    this.http.post(this.url + '/comment',{"id":id,"start":value}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


  putComment(id,link,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/reply',{"id":id,"link":link},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  putCom(id,link,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/setComment',{"id":id,"link":link},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  addLink(id,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/like',{"id":id,"value":'1'},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  delLink(id,callback){
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/like',{"id":id,"value":'-1'},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })

  }


}
