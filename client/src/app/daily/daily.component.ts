import { Component, OnInit,ViewChild } from '@angular/core';
import {UserService} from '../services/user.service';
import {GetMyDailyCountService} from '../services/get-my-daily-count.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.css'],
  providers:[UserService,GetMyDailyCountService]
})
export class DailyComponent implements OnInit {
text:any;
  info:any;
  user_name:any;
  _myDailyCount:number;
  constructor(
    private userSer:UserService,private router:Router,
    private getCount:GetMyDailyCountService
  ) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
      if(result.code=='u200'||result.code=="u402"){
        that.user_name=result.data.name;
      }else {
        that.router.navigate(['login']);
      }
    })
    that.userSer.getInfo(function (result) {
      that.info=result.data;
    })

that.getCount.getMyDailyCount(function (result) {
  that._myDailyCount=result.everyday;
})
  }
  toPersonal(){
    this.router.navigate(['personal']);
  }
  toPersonalFollowers(){
    this.router.navigate(['./personal/follower']);
  }
  toPersonalFans(){
    this.router.navigate(['./personal/fans']);
  }
  toPersonalDaily(){
    this.router.navigate(['./personal/myDaily']);
  }
}
