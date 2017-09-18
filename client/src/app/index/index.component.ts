import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  //  isTrue:boolean=false;
  // til="零基础的前端开发初学者应如何系统地学习?";
  // con="北京地铁站里随处可见的禁止买卖象牙广告,那些艺人，主持人，摆着个欲哭无泪的严肃表情宣传不让买卖象牙观点是好的可是.长年累月的那么多广告板突然觉得很好笑每一幅一个宣传语比如世界上唯一需要象牙的是大象北京天天挤地铁的人你觉得买得起象牙制品吗在早晚高峰的地铁大军中大多数是迷茫无神的面孔那些背井离乡来到北京的人最后强调买卖象牙的确不应该有如此的金钱投入明星效应，不如关注留守儿童，留守老人类似的还有很多城市公交站台上常年红字滚动的反腐倡廉的广有能力贪污腐败的那个阶层会来坐公交";

  constructor(
    private router: Router,
  ) {}


  ngOnInit() {

  }
 toAnswer(){
   this.router.navigate(['answer']);
 }
 // toSee(){
 //   this.isTrue=!this.isTrue;
 // }
}
