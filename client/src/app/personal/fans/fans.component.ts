import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';  //导入服务
import {UpdataService} from '../../services/updata.service';

@Component({
  selector: 'app-fans',
  templateUrl: './fans.component.html',
  styleUrls: ['./fans.component.css'],
  providers:[UserService,UpdataService]
})
export class FansComponent implements OnInit {
  showfans:any;
  addfans:any;
  isFans:boolean=false;
  noFans:boolean=true;
  constructor(private userSer:UserService,private upser:UpdataService) {
  }

  ngOnInit() {
    let that=this;



    that.upser.showfans(function (result) {
      that.showfans=result.data;
      console.log(result);
      // alert(result);
    })
  }






  add(id){
    let that=this;
    that.upser.add( id,function (result) {
      that.addfans=result.data;
      console.log(result);
      that.isFans=true;
      that.noFans=false;
    })
  }

}
