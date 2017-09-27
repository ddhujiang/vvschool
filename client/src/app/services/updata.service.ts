import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';  //导入http对象
import {LocalStorageService} from './local-storage.service';

@Injectable()
  export class UpdataService {
  url: string = 'http://127.0.0.1:3000/rests';
  constructor(private  http: HttpClient,
              private  ls: LocalStorageService) { }
  getnumber(callback) {
    this.http.post(this.url + '/hasFollower', {"id": this.ls.get('id')}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  showfoll(callback) {
  this.http.post(this.url + '/getFollower',{"id":this.ls.get('id')}).subscribe(function (result) {
      console.log(result);
      callback(result);
    },
    function (error) {
      console.log(error.message);
    })
}

  showTafoll(id,callback) {
    this.http.post(this.url + '/getFollower',{"id":id}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }



  showfans(callback) {
    this.http.post(this.url + '/getFans',{"id":this.ls.get('id')}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  showTafans(id,callback) {
    this.http.post(this.url + '/getFans',{"id":id}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }




  add(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/addFollower',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  addfans(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/addFollower',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  isFan(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/isFollower',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }




  del(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/deleteFollower',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


  showCollect(callback){
  this.http.post(this.url + '/getCollect',{"id":this.ls.get('id')}).subscribe(function (result) {
    console.log(result);
    callback(result);
  },
  function (error) {
    console.log(error.message);
  })
}

showTacollect(id,callback){
  this.http.post(this.url + '/getCollect',{"id":id}).subscribe(function (result) {
      console.log(result);
      callback(result);
    },
    function (error) {
      console.log(error.message);
    })
}




  addColl(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/addCollect',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }

  delColl(id,callback) {
    let _head = new HttpHeaders({token: this.ls.get('token')});
    this.http.post(this.url + '/deleteCollect',{"id":id},{headers: _head}).subscribe(function (result) {
        console.log(result);
        callback(result);
      },
      function (error) {
        console.log(error.message);
      })
  }


}
