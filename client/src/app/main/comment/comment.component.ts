import { Component, OnInit,Input } from '@angular/core';
// import {DetailService} from '../../services/detail.service';  //导入服务

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  // providers:[DetailService]
})
export class CommentComponent implements OnInit {
  @Input() _qus:any;
  // detail:any;
  constructor(
    // private detailSer:DetailService
  ) { }
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;

  ngOnInit() {
  }
  toSee(){
    this.isTrue=!this.isTrue;
  }
  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }
  // upId(anwId){
  //   let that=this;
  //   that.detailSer.getDetail(anwId ,function (result){
  //     that.detail=result.data;
  //   });
  //   that.detailSer.getVar(that.detail);
  // }

}
