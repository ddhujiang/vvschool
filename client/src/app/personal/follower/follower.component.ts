import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';  //导入服务

@Component({
  selector: 'app-follower',
  templateUrl: './follower.component.html',
  styleUrls: ['./follower.component.css'],
  providers:[UserService]
})
export class FollowerComponent implements OnInit {
  user_id:any;
  constructor(private ar:ActivatedRoute,private userSer:UserService) { }

  ngOnInit() {
    let that=this;
    that.user_id=that.ar.snapshot.params['id'];
  }

}
