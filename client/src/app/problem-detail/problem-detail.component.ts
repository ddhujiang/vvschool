import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/user.service';  //导入服务
import {DetailService} from '../services/detail.service';
import {IndexService} from '../services/index.service';

@Component({
  selector: 'app-problem-detail',
  templateUrl: './problem-detail.component.html',
  styleUrls: ['./problem-detail.component.css'],
  providers:[UserService, DetailService, IndexService]
})
export class ProblemDetailComponent implements OnInit {
  public editor;
  public editorContent ;
  public editorOptions = {
    theme: "snow",
    placeholder: "insert content..."
  };
  detail:any;
  id:string;
  user:any;
  isTrue:boolean=false;
  noTrue:boolean=false;
  more:any;
  noMore:string;
  isWrite:boolean=false;
  constructor(private indexSer:IndexService,
              private userSer:UserService,
              private detailSer:DetailService,
              private ar:ActivatedRoute
              ) { }

  ngOnInit() {
    let that=this;
    that.userSer.getAllUser(function (result) {
        // that.user_name=result.data.name;
      that.user=result.data;
    });

    that.id=that.ar.snapshot.params['id'];
    console.log(that.id);
    that.detailSer.getDetail(that.id,function (result){
      console.log(result);
      that.detail=result.data;
      });

  }
  toMore() {
    // this.isTrue = !this.isTrue;
    let that = this;
    // alert(that.detail.question.id);
    // alert(that.detail.answer.id);

    that.detailSer.getMore(that.detail.question.id, that.detail.answer.id, function (result) {
      if(result.code=="q200"){
        // alert(result);
        that.more=result.data;
        that.isTrue=true;
      }else if(result.code=="q303"){
        that.noMore="无更多回答";
        that.isTrue=false;
        that.noTrue=true;
        console.log(that.noMore);
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
    that.indexSer.putComment( that.detail.question.id,that.editorContent,function (result) {
      alert(result)
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
