import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-shdaily',
  templateUrl: './shdaily.component.html',
  styleUrls: ['./shdaily.component.css']
})
export class ShdailyComponent implements OnInit {
  value:string;
  constructor(private ar:ActivatedRoute) { }

  ngOnInit() {
    let that=this;
    that.value=that.ar.snapshot.params['id'];
  }

}
