import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';  //导入http对象

import {LocalStorageService} from './local-storage.service';
@Injectable()
export class UserService {
  url: string = 'http://127.0.0.1:3000/users';

  constructor(private  http: HttpClient,
              private  ls: LocalStorageService) {}         //构建http对象
  login(user, callback) {

    this.http.post(this.url + '/login', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })

  }

  addUser(user, callback) {
    this.http.post(this.url + '/register', user).subscribe(function (result) {
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  editUser() {

  }

  getAllUser(callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.get(this.url + '/data',{headers: _head} ).subscribe(
      function (result) {
        console.log(result);
        callback(result);
      }, function (error) {
        console.log(error.message);
      }
    )
  }
  getInfo(callback) {
     const body={"ID":this.ls.get('id')};
    this.http.post(this.url + '/info', body).subscribe(
      function (result) {
        callback(result);
      }, function (error) {
        console.log(error.message);
      }
    )
  }

  getTainfo(ID,callback) {
    this.http.post(this.url + '/info', {"ID":ID}).subscribe(
      function (result) {
        callback(result);
      }, function (error) {
        console.log(error.message);
      }
    )
  }





  getsPeople(keyword,callback) {
    this.http.post(this.url + '/search', {"keyword": keyword}).subscribe(function (result) {
        console.log(result);
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }



  getsMyanswer(id,callback) {
    this.http.post(this.url + '/answer', {"id": id}).subscribe(function (result) {
        console.log(result);
        // console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }




  getsMyqus(id,callback) {
    this.http.post(this.url + '/question', {"id": id}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

}
