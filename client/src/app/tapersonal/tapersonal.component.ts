import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
import {UpdataService} from '../services/updata.service';
@Component({
  selector: 'app-tapersonal',
  templateUrl: './tapersonal.component.html',
  styleUrls: ['./tapersonal.component.css'],
  providers:[UserService,UpdataService]
})
export class TapersonalComponent implements OnInit {
  user_id:any;
  info:any;
  addfans:any;
  isFans:boolean=false;
  noFans:boolean=true;
  isFan:any;
  constructor(
              private userSer:UserService,
              private ar:ActivatedRoute,private upser:UpdataService) { }

  ngOnInit() {

    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.userSer.getTainfo(that.user_id,function (result) {
      that.info=result.data;
    });


    that.upser.isFan(that.user_id,function (result) {
      that.isFan=result.data;
      if(result.code=="r901"){
        that.isFans=true;
        that.noFans=false;
      } else{
        that.noFans=true;
        that.isFans=false;
      }
    })
  }

  add(){
    let that=this;
    that.isFans=true;
    that.noFans=false;
    that.upser.addfans(that.user_id,function (result) {
      that.addfans=result.data;
      console.log(result);
      that.isFans=true;
      that.noFans=false;
    })
  }



}
