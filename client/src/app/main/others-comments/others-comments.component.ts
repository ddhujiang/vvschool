import { Component, OnInit,Input } from '@angular/core';
import {UserService} from './../../services/user.service';
import {DeleteCommentService} from './../../services/delete-comment.service';

import {Router} from '@angular/router';


@Component({
  selector: 'app-others-comments',
  templateUrl: './others-comments.component.html',
  styleUrls: ['./others-comments.component.css'],
  providers:[UserService,DeleteCommentService]
})
export class OthersCommentsComponent implements OnInit {
  info:any;
  _count=4;
  @Input() singlesay:any;
  @Input() comments:any;
  constructor(private userSer:UserService,
              private deleteCom:DeleteCommentService,
  ) { }
  ngOnInit() {
    const that=this;
    that.userSer.getInfo(function (result) {
      that.info=result.data;
    })

  }

  viewmore(){
    this._count+=5;
  }

  deleteComment(commentId){
        this.deleteCom.deleteComment(commentId,function () {

        })

  }
}
