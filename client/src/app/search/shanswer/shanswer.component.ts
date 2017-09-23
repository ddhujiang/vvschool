import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailService} from '../../services/detail.service';
@Component({
  selector: 'app-shanswer',
  templateUrl: './shanswer.component.html',
  styleUrls: ['./shanswer.component.css'],
  providers:[
    DetailService
  ]
})
export class ShanswerComponent implements OnInit {
  value:string;
  serValue:any;
  isAns:boolean=false;
  noAns:boolean=false;
  constructor(private ar:ActivatedRoute,private detailSer:DetailService) { }
  ngOnInit() {
    let that=this;
    that.value=that.ar.snapshot.params['id'];
    that.detailSer.getSearch(that.value,function (result) {
      // alert(result)
      if(result.code=="q200"){
        that.serValue=result.data;
        that.isAns=true;
      }else if(result.code=="q302"){
        that.noAns=true;
      }else if(result.code=="err601"){
        console.log("逻辑错误")
      }

    })
  }

}
