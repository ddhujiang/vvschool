import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';  //导入服务
import {UpdataService} from '../../services/updata.service';
@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.css'],
  providers:[UserService,UpdataService]
})
export class CollectComponent implements OnInit {
  user_id:any;
  showCollect:any;
  isColl:boolean=false;
  noColl:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;

  constructor(private userSer:UserService,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.upser.showCollect(function (result) {
      if(result.code=="r200"){
        that.showCollect=result.data;
        that.isColl=true;
        that.noColl=false;
      }else if(result.code=="r303"){
        that.noColl=true;
        that.isColl=false;
      }
      console.log(result);
    })

  }

  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }

}
