import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';  //导入服务
@Component({
  selector: 'app-shpeople',
  templateUrl: './shpeople.component.html',
  styleUrls: ['./shpeople.component.css'],
  providers:[UserService]
})
export class ShpeopleComponent implements OnInit {
  value:string;
  serValue:any;
  isAns:boolean=false;
  noAns:boolean=false;
  constructor(private ar:ActivatedRoute,
              private userSer:UserService,) { }
  ngOnInit() {
    let that=this;
    that.value=that.ar.snapshot.params['id'];
    that.userSer.getsPeople(that.value,function (result) {
      if(result.code=="u200"){
        that.serValue=result.data;
        that.isAns=true;
      }else if(result.code=="u302"){
        that.noAns=true;
      }else if(result.code=="err601"){
        console.log("逻辑错误")
      }
    })
  }

}
