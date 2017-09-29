import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-myDaily-main',
  templateUrl: './myDaily-main.html',
  styleUrls: ['./myDaily-main.css']
})
export class MyDailyMainComponent implements OnInit {
@Input() _oneDaily:any;
  constructor() { }

  ngOnInit() {
  }

}
