import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpdataService} from '../../services/updata.service';  //导入服务
@Component({
  selector: 'app-tafans',
  templateUrl: './tafans.component.html',
  styleUrls: ['./tafans.component.css'],
  providers:[UpdataService]
})
export class TafansComponent implements OnInit {
  showfans:any;
  user_id:any;
  constructor(private ar:ActivatedRoute,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.upser.showTafans(that.user_id,function (result) {
      that.showfans=result.data;
      console.log(result);
      // alert(result);
    })
  }
}
