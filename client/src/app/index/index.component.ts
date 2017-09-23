import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';               //导入路由模块
import {UserService} from '../services/user.service';  //导入服务
import {IndexService} from '../services/index.service';
// import {LocalStorageService} from '../services/local-storage.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[UserService,
    IndexService]
})
export class IndexComponent implements OnInit {
  user_name:any;
  // user:any;
  qus:any;
  // index:any;
  constructor(
    private router: Router,
    private userSer:UserService,
    private indexSer:IndexService
    // private localstorage:LocalStorageService
  ) {}


  ngOnInit() {
      let that=this;
      that.userSer.getAllUser(function (result) {
        if(result.code=='u200'||result.code=="u402"){
          // that.user_name=result.data.name;
          that.user_name=result.data.name;
          // that.user=result;
          // alert(that.user_name);
        }else {
          that.router.navigate(['login']);
        }
      })

    that.indexSer.getAnswerer(function (result) {
       that.qus=result.data;
      console.log(result);
      // that.index=result.length;
      // console.log(result);
      // console.log(result[0].answerer);
    })

  }

 toAnswer(){
   this.router.navigate(['answer']);
 }

}
