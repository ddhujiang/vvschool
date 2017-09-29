import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpdataService} from '../../services/updata.service';  //导入服务

@Component({
  selector: 'app-tafollower',
  templateUrl: './tafollower.component.html',
  styleUrls: ['./tafollower.component.css'],
  providers:[UpdataService]
})
export class TafollowerComponent implements OnInit {
  user_id:any;
  showfoll:any;
  delfoll:any;
  isFollower:boolean=false;
  noFollower:boolean=false;
  constructor(private ar:ActivatedRoute,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
    that.upser.showTafoll(that.user_id,function (result) {
      if(result.code=="r200")
      {that.showfoll=result.data;
      that.isFollower=true;}
      else if(result.code=="r904"){
        that.noFollower=true;}
      console.log(result);
    })

  }

}
