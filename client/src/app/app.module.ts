//导入系统模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';    //要用表单必须导入这个模块
import {HttpClientModule} from '@angular/common/http';

//导入组件
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import {RegistComponent} from './regist/regist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavComponent } from './main/nav/nav.component';
import { ClubComponent } from './club/club.component';
import { PersonalComponent } from './personal/personal.component';
import { ConfessionComponent } from './confession/confession.component';
import { DailyComponent } from './daily/daily.component';
import { ProblemDetailComponent } from './problem-detail/problem-detail.component';
import { AnswerComponent } from './answer/answer.component';
import { CommentComponent } from './personal/comment/comment.component';
import { OthersCommentsComponent } from './main/others-comments/others-comments.component';
import {PublishCommentsComponent} from './main/publish-comments/publish-comments.component';
import {SayComponent} from './main/say/say.component';
import {SayCardComponent} from './personal/say-card/say-card.component';

//导入根路由模块
import {AppRoutingModule} from './app-routing.module';
//导入子路由
import {PersonalRoutingModule} from './personal/personal-routing.module';
//管道
import { CutPipe } from './pipes/cut.pipe';
import { SetComponent } from './set/set.component';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    RegistComponent,
    PageNotFoundComponent,
    NavComponent,
    ClubComponent,
    PersonalComponent,
    ConfessionComponent,
    DailyComponent,
    ProblemDetailComponent,
    AnswerComponent,
    CutPipe,
    CommentComponent,
    OthersCommentsComponent,
    PublishCommentsComponent,
    SayComponent,
    SayCardComponent,
    SetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    PersonalRoutingModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
