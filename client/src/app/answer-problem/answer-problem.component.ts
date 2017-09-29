import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {UserService} from '../services/user.service';  //导入服务
import {DetailService} from '../services/detail.service';
import {IndexService} from '../services/index.service';
@Component({
  selector: 'app-answer-problem',
  templateUrl: './answer-problem.component.html',
  styleUrls: ['./answer-problem.component.css'],
  providers:[UserService, DetailService, IndexService]
})
export class AnswerProblemComponent implements OnInit {

  public editor;
  public editorContent ;
  public editorOptions = {
    theme: "snow",
    placeholder: "insert content..."
  };

  detail:any;
  id:string;
  // user:any;
  isans:boolean=false;
  noans:boolean=false;
  // more:any;
  // noMore:string;
  isWrite:boolean=false;
  constructor(private indexSer:IndexService,
              private userSer:UserService,
              private detailSer:DetailService,
              private ar:ActivatedRoute
  ) { }


  ngOnInit() {
    let that=this;
    that.id=that.ar.snapshot.params['id'];
    alert(that.id)

    that.detailSer.getAllqus(that.id,function (result) {
      if(result.code=="q200"){
        that.isans=true;
        that.noans=false;
        that.detail=result.data;
      }else if(result.code=="q303"){
        that.noans=true;
        that.isans=false;
        that.detail=result.question;
      }else if(result.code=="err601"){
        console.log("逻辑错误 ");
      }
      console.log(result);
    })

  }


//  写回答调用的事件
  toWrite(){
    this.isWrite=!this.isWrite;
  }
  toGet(){
    let that=this;
    that.isWrite=false;
    that.indexSer.putComment( that.id,that.editorContent,function (result) {
      console.log(result);
    });
  }




  //编辑器事件
  onEditorBlured(quill) {
    console.log('editor blur!', quill);
  }

  onEditorFocused(quill) {
    console.log('editor focus!', quill);
  }

  onEditorCreated(quill) {
    this.editor = quill;
    console.log('quill is ready! this is current quill instance object', quill);
  }

  onContentChanged({quill, html, text}) {
    console.log('quill content is changed!', quill, html, text);
  }

}
