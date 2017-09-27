import { Component, OnInit,Input  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';  //导入服务
import {IndexService} from '../../services/index.service';  //导入服务
@Component({
  selector: 'app-myanswer',
  templateUrl: './myanswer.component.html',
  styleUrls: ['./myanswer.component.css'],
  providers:[UserService,IndexService]
})
export class MyanswerComponent implements OnInit {
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;
  qus:any;
  user_id:any;
  userValue:any;
  isAns:boolean=false;
  noAns:boolean=false;
  comment:any;
  constructor(private ar:ActivatedRoute,private userSer:UserService,private indexSer:IndexService) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.userSer.getsMyanswer(that.user_id,function (result) {
      if(result.code=="u200"){
        that.userValue=result.data;
        that.isAns=true;
      }else if(result.code=="u303"){
        that.noAns=true;
      }else if(result.code=="err601"){
        alert(result.code)
        console.log("逻辑错误")
      }
    })
  }

  toSee(){
    let that=this;
    that.isTrue=!that.isTrue;
    that.indexSer.getComment(that.userValue.answer.id,function (result) {
      that.comment=result.data;
    })
  }

  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }

}
