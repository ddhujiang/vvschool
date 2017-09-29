import { Component, OnInit,Input} from '@angular/core';
import {GeMyDailyService} from '../../services/ge-my-daily.service';
import {GetMoreMyService} from "../../services/get-more-my.service";

@Component({
  selector: 'myDaily-card',
  templateUrl: './myDaily.component.html',
  styleUrls: ['./myDaily.component.css'],
  providers:[GeMyDailyService,GetMoreMyService]
})
export class MyDailyComponent implements OnInit {
  myDailys:any;
  info:any;
  next:any;
  constructor( private getMy:GeMyDailyService,
               private getMoreMyDaily: GetMoreMyService,
  ) { }
  ngOnInit() {
    const that=this;
    that.getMy.getMyDaily(function (result) {
      if(result.code==="e200"){
        that.myDailys=result.data;
        that.next=result.next;
      }else if(result.code==="e301"){
        console.log(("无日常"));;
      } else{
        console.log(("错误"));;
      }
      console.log(result);
    });
  }

  getMore(){
    const that=this;
    this.getMoreMyDaily.getMoreMy(that.next,function (result) {
      if(result.code='e200'){
        that.myDailys=that.myDailys.concat(result.data);
        that.next=result.next;
      }else{
        console.log("错误");
      }
    })
  }
}
