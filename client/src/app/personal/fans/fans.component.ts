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
  isFan:boolean=false;
  noFan:boolean=false;

  constructor(private userSer:UserService,private upser:UpdataService) {
  }

  ngOnInit() {
    let that=this;
    that.upser.showfans(function (result) {
      if(result.code=="r200")
      { that.showfans=result.data;
        that.isFan=true;}
      else if(result.code=="r904"){
        that.noFan=true;}
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
