import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  @Input() _user:any;
  _value:string;
  constructor(private router:Router) { }

  ngOnInit() {

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
    this.router.navigate(['regist']);
  };

}
