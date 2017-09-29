import { Component, OnInit } from '@angular/core';
import {DailyService} from './../../services/daily.service';
import {DailyGetService} from './../../services/daily-get.service';
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";
import {ImgService} from "./../../services/img.service";
import {AddMoreService} from "./../../services/add-more.service";



@Component({
  selector: 'app-say',
  templateUrl: './say.component.html',
  styleUrls: ['./say.component.css'],
  providers:[DailyService,DailyGetService,ImgService,AddMoreService]
})
export class SayComponent implements OnInit {

next:any;
  constructor(
    private daily:DailyService,
    private dailyget:DailyGetService,
    private imgSer: ImgService,
    private addmore: AddMoreService,
  ) { }
_data:any;
  ngOnInit() {
    const that=this;
    that.dailyget.get(function (result) {
      // console.log("this");
      if(result.code==="e200"){
        that._data=result.data;
        that.next=result.next;
      }else {
       console.log("错误");
      }
    });


  }





//img.join(",")
  // 图片上传
  public img: Array<string> = [];
  public imgUrl:string = "http://127.0.0.1:3000/api/photoUpload";

  //编辑器
  public EDayContent;
  public EDayOptions = {
    theme: "bubble",
    placeholder: "写日常...",
    modules: {
      toolbar: [
        [ 'bold','italic', 'underline', 'strike',{ 'script': 'sub'}, { 'script': 'super' },'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' },{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] },'clean']
      ]
    },
    formats:['bold','italic', 'underline', 'strike','script','list', 'blockquote', 'indent', 'color', 'background']
  };



  // 图片上传
  imageFinishedUploading(file: FileHolder) {
    let o = JSON.parse(file.serverResponse["_body"]);
    if (o.code === "f200") {
      this.img.push(o.src[0]);
    } else {
      alert("imageFinishedUploading: 错误")
    }
  }

  imageRemoved(file: FileHolder) {
    let o = JSON.parse(file.serverResponse["_body"]);
    let index = this.img.indexOf(o.src[0]);
    if (index !== -1) {
      this.imgSer.deleteFile(o.src[0], (result) => {});
      this.img.splice(index, 1);
    }
  }

  uploadStateChange(state: boolean) {}

  send(){
    const that=this;
    this.daily.publish(this.EDayContent,this.img,function (result) {
      if(result.code=='e200'){
        that.dailyget.get(function (result) {
          // console.log("this");
          if(result.code==="e200"){
            that._data=result.data;
          }else {
           console.log("错误");
          }
        });

        that.EDayContent='';
        that.img=[];
      }else{
        console.log('错误');
      }
    })
  }

addMore(){
  const that=this;
this.addmore.addMoreDaily(that.next,function (result) {
  if(result.code='e200'){
    that._data=that._data.concat(result.data);
    that.next=result.next;


  }else{
    console.log("错误");
  }
})
}
}
