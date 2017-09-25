import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
// import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务

@Component({
  selector: 'app-tapersonal',
  templateUrl: './tapersonal.component.html',
  styleUrls: ['./tapersonal.component.css'],
  providers:[UserService]
})
export class TapersonalComponent implements OnInit {
  user_id:any;
  info:any;
  constructor(
             // private router:Router,
              private userSer:UserService,
              private ar:ActivatedRoute) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.userSer.getTainfo(that.user_id,function (result) {
      that.info=result.data;
    })
  }

}
