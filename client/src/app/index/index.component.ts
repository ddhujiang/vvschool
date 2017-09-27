import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
import {IndexService} from '../services/index.service';
import {UpdataService} from '../services/updata.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[UserService,IndexService,UpdataService]
})

export class IndexComponent implements OnInit {
  user:any;
  _profession:any;
  _title:any;
  _link:any;
  qus:any;
  next:any;
  show:boolean=false;
  info:any;
  isShow:boolean=false;
  constructor(
    private router: Router,
    private userSer:UserService,
    private indexSer:IndexService,
    private upser:UpdataService
  ) {}


   ngOnInit() {
      let that=this;
      that.userSer.getAllUser(function (result) {
        if(result.code=='u200'||result.code=="u402"){
          that.user=result.data;
        }else {
          that.router.navigate(['login']);
        }
      });
    that.indexSer.getAnswerer(function (result) {
       that.qus=result.data;
       that.next=result.next;
      console.log(result);
      // that.index=result.length;
      // console.log(result);
      // console.log(result[0].answerer);
    })
  }

   toAnswer(){
   this.router.navigate(['answer']);
 }
   toQus(_title,_link,_profession){
     let that=this;
     that.indexSer.getQus(_title,_link,_profession,function (result) {
     })
  }

  toMore(){
     let that=this;
      that.indexSer.getMoreAnswerer(that.next,function (result) {
      that.qus=that.qus.concat(result.data)
      that.next=result.next;
      that.show=true;
      console.log(result);
    })
  }

  toinfo(id){
    let that=this;
    that.userSer.getTaInfo(id,function (result) {
      that.info=result.data;
      console.log(result);
    });
    that.isShow=true;
  }


}
