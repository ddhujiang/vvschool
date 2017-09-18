import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {

  }
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
