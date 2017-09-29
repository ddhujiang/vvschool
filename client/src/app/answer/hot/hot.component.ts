import { Component, OnInit } from '@angular/core';
import {DetailService} from '../../services/detail.service';
@Component({
  selector: 'app-topic',
  templateUrl: './hot.component.html',
  styleUrls: ['./hot.component.css'],
  providers:[ DetailService]
})
export class HotComponent implements OnInit {
  hotQus:any;
  constructor(private detailSer:DetailService) { }

  ngOnInit() {

    let that=this;
    that.detailSer.hotQus(function (result){
      console.log(result);
      that.hotQus=result.data;
    });

  }

}
