import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DetailService} from '../services/detail.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers:[
    DetailService
  ]
})
export class SearchComponent implements OnInit {
  value:any;
  constructor(private ar:ActivatedRoute,private detailSer:DetailService) {

  }

  ngOnInit() {
    let that=this;
    that.value=that.ar.snapshot.params['id'];
    // that.detailSer.getSearch(that.value,function (result) {
    //   if(result.code=="q200"){
    //     that.serValue=result.data;
    //     alert(result.data.question.id)
    //   }else if(result.code=="q302"){
    //    that.noQus="无该问题 "
    //   }else if(result.code=="err601"){
    //     console.log("逻辑错误")
    //   }
    //
    // })

  }

}
