import {Component, OnInit} from '@angular/core';
import {UserService} from './../../services/user.service';
import {FixnicknameService} from './../../services/fixnickname.service';
import {FileHolder} from "angular2-image-upload/lib/image-upload/image-upload.component";
import {ImgService} from "./../../services/img.service"
import {UploadimgService} from "./../../services/uploadimg.service"
import {FixSelfIntroduceService} from "./../../services/fix-self-introduce.service"
import {log} from "util";

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css'],
  providers: [UserService, FixnicknameService, ImgService, UploadimgService,
    FixSelfIntroduceService
  ]
})
export class BasicInfoComponent implements OnInit {
  public img: string;
  info: any;
  nickname: any;
  selfIntroduce:any;
  constructor(private userSer: UserService, private myfixnickname: FixnicknameService,
              private imgSer: ImgService, private fixicon: UploadimgService,
              private  fixselIntro:FixSelfIntroduceService
  ) {
  }

  ngOnInit() {
    let that = this;
    that.userSer.getInfo(function (result) {
      that.info = result.data;
    })
  }

  fix() {
    let that = this;
    if(this.nickname){
    that.myfixnickname.fixnickname(this.nickname,function (result)
      {
        if(result.code=='u200')
        {
          that.userSer.getInfo(function (result) {
            that.info=result.data;
          })
        }else{
          console.log("错误");
        }
      })}

    console.log("123");
    if(that.img){
    that.fixicon.pushsrc(that.img, function (result) {
      if (result.code == 'f200') {
        that.userSer.getInfo(function (result) {
          that.info = result.data;
        })
      } else if (result.code == 'f301') {
        console.log("失败");
      } else {
        console.log("逻辑错误", that.img);
      }
    })}

    if(that.selfIntroduce){
    that.fixselIntro.fixSel(that.selfIntroduce,function (result) {
      if (result.code == 'f200') {
        that.userSer.getInfo(function (result) {
          that.info = result.data;
        })
      } else if (result.code == 'f301') {
        console.log("失败");
      } else {
        console.log("逻辑错误", that.img);
      }
    })}
  }

  imageFinishedUploading(file: FileHolder) {
    let o = JSON.parse(file.serverResponse["_body"]);
    if (o.code === "f200") {
      this.img = o.src;
    } else {
      alert("imageFinishedUploading: 错误")
    }
  }

  imageRemoved(file: FileHolder) {
    let o = JSON.parse(file.serverResponse["_body"]);
    let index = this.img.indexOf(o.src);
    if (index !== -1) {
      this.imgSer.deleteFile(o.src, (result) => {
      });
      this.img = "static/default.png"
    }
  }

  uploadStateChange(state: boolean) {
  }


}
