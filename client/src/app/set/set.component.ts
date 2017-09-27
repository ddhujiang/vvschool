import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css'],
  providers:[UserService]
})
export class SetComponent implements OnInit {
   user_name:any;
   info:any;
   constructor(private userSer:UserService) { }

    ngOnInit() {
    let that=this;
    that.userSer.getInfo(function (result) {
      that.info=result.data;
    })
  }

}
