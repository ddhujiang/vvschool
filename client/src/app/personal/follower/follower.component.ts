import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';  //导入服务
import {UpdataService} from '../../services/updata.service';  //导入服务
@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css'],
  providers:[UserService,UpdataService]
})
export class FollowerComponent implements OnInit {
  user_id:any;
  showfoll:any;
  delfoll:any;
  constructor(private userSer:UserService,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.upser.showfoll(function (result) {
      that.showfoll=result.data;
      console.log(result);
      // alert(result);
    })
  }

  del(id){
    let that=this;
    that.upser.del( id,function (result) {
      that.delfoll=result.data;
      console.log(result);
      // alert(result);
    });
  }

  toque(){
    let that=this;
    that.upser.showfoll(function (result) {
      that.showfoll=result.data;
      console.log(result);
      // alert(result);
    })
  }


}
