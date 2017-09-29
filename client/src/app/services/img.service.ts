/**
 * Created by Charlie on 2017/9/27.
 */
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders,HttpParams} from '@angular/common/http';

@Injectable()
export class ImgService {

  constructor(private  http: HttpClient) { }

  deleteFile(data,cb){
    this.http.post("http://127.0.0.1:3000/api/deleteFile",{"name":data}).subscribe(function (result) {
      cb(result);
    },function (error) {
      console.log("deleteFile"+error.message)
    })
  }
}
