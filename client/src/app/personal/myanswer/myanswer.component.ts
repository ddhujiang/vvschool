import { Component, OnInit,Input  } from '@angular/core';
import {IndexService} from '../../services/index.service';

@Component({
  selector: 'app-myanswer',
  templateUrl: './myanswer.component.html',
  styleUrls: ['./myanswer.component.css'],
  providers:[
    IndexService]
})
export class MyanswerComponent implements OnInit {
  isTrue:boolean=false;
  isCut:boolean=true;
  noCut:boolean=false;
  qus:any;

  constructor(private indexSer:IndexService) { }


  ngOnInit() {
    let that=this;
    that.indexSer.getAnswerer(function (result) {
     that.qus=result.data;
       })
  }


  toSee(){
    this.isTrue=!this.isTrue;
  }
  toRead(){
    this.isCut=!this.isCut;
    this.noCut=!this.noCut;
  }

}
