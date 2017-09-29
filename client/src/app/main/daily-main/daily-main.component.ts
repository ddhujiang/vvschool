import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-daily-main',
  templateUrl: './daily-main.component.html',
  styleUrls: ['./daily-main.component.css']
})
export class DailyMainComponent implements OnInit {
@Input() oneDaily:any;
  constructor() { }

  ngOnInit() {
  }

}
