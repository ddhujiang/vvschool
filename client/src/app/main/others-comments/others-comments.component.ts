import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-others-comments',
  templateUrl: './others-comments.component.html',
  styleUrls: ['./others-comments.component.css']
})
export class OthersCommentsComponent implements OnInit {
_viewmore=false;
  constructor() { }

  ngOnInit() {
  }
  viewmore(){
    this._viewmore=!this._viewmore;
  }
}
