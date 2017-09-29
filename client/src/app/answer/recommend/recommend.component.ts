import { Component, OnInit } from '@angular/core';
import {DetailService} from '../../services/detail.service';
@Component({
  selector: 'app-content',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
  providers:[ DetailService]
})
export class RecommendComponent implements OnInit {
  recommendQus:any;

  constructor( private detailSer:DetailService) {
  }

  ngOnInit() {

    let that=this;
    that.detailSer.recommendQus(function (result){
      console.log(result);
      that.recommendQus=result.data;
    });

  }

}
