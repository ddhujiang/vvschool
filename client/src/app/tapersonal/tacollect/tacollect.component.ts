import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UpdataService} from '../../services/updata.service';
@Component({
  selector: 'app-tacollect',
  templateUrl: './tacollect.component.html',
  styleUrls: ['./tacollect.component.css'],
  providers:[UpdataService]
})
export class TacollectComponent implements OnInit {
  id:any;
  showCollect:any;
  isColl:boolean=false;
  noColl:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;

  constructor(private ar:ActivatedRoute,private upser:UpdataService) { }

  ngOnInit() {
    let that=this;
    that.id=that.ar.snapshot.params['id'];
    that.upser.showTacollect(that.id,function (result) {
      if(result.code=="r200"){
        that.showCollect=result.data;
        that.isColl=true;
        that.noColl=false;
      }else if(result.code=="r303"){
        that.noColl=true;
        that.isColl=false;
      }
      console.log(result);
    })
  }

  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }

}
