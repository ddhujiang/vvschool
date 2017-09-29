import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';  //导入服务

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers:[UserService,
    ]
})
export class NavComponent implements OnInit {
  @Input() _user:any;
  user_name:any;
  _value:string;
  constructor(private router:Router,
              private userSer:UserService,) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
      if(result.code=='u200'||result.code=="u402"){
        that.user_name=result.data.name;
      }else {
        that.router.navigate(['login']);
      }
    })

  }
  // toSearch(loginForm){
  //   let that=this;
  //   //console.log(login_form.value);
  //   that.userSer.login(login_form.form.value,function (result) {
  //
  //       alert(JSON.stringify(result));
  //       that.router.navigate(['/index']);   //登入成功来到首页
  //
  //   })

  // }

  toPersonal(){
    this.router.navigate(['personal']);
  };

  toSet(){
    this.router.navigate(['set']);
  };

  toRegist(){
    this.router.navigate(['login']);
  };

}
