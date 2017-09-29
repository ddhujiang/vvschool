import { Component, OnInit,Input } from '@angular/core';
import {DeleteDailyService} from './../../../services/delete-daily.service';
import {UserService} from './../../../services/user.service';


@Component({
  selector: 'app-my-say-card',
  templateUrl: './my-say-card.component.html',
  styleUrls: ['./my-say-card.component.css'],
  providers:[DeleteDailyService,UserService]
})
export class MySayCardComponent implements OnInit {
@Input() _mysay:any;
  _myInfo:any;
  constructor(  private  deleteDaily:DeleteDailyService,
                private userSer:UserService,) { }

  ngOnInit() {
    const that=this;
    that.userSer.getInfo(function (result) {
      that._myInfo=result.data;
    })

  }
  _comment=false;
  comments(){
    this._comment=!this._comment;
  }
  delete(everyId){
    if(confirm('确定删除吗？')){
      this.deleteDaily.deleteMyDaily(everyId,function () {

      })
    }else{

    }
  }
}
