import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';  //导入服务
import {DetailService} from '../../services/detail.service';
@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
  providers:[UserService, DetailService]
})
export class ProblemComponent implements OnInit {
  user_id:any;
  userValue:any;
  isAns:boolean=false;
  noAns:boolean=false;
  myQus:any;
  constructor(private router:Router,private ar:ActivatedRoute,private userSer:UserService,private detailSer:DetailService) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.userSer.getsMyqus(that.user_id,function (result) {
      console.log(result);
      if(result.code=="u200"){
        that.userValue=result.data;
        that.isAns=true;
      }else if(result.code=="u302"){
        that.noAns=true;
      }else if(result.code=="err601"){
        alert(result.code)
        console.log("逻辑错误")
      }
    })

  }

  // toqus(){
  //   let that=this;
  //   alert(that.userValue.question.id);
  //   that.detailSer.getmyQus(that.userValue.question.id,function (result) {
  //     console.log(that.myQus.answerer.id);
  //     alert(that.myQus.answerer.id)
  //     that.myQus=result.data;
  //   })
  // }


}
