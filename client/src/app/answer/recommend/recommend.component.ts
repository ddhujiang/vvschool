import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
  arr=[1,2,3,4,5,6];
  constructor() { }

  ngOnInit() {
  }

}
