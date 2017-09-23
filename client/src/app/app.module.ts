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
import { CommentComponent } from './main/comment/comment.component';
import { OthersCommentsComponent } from './main/others-comments/others-comments.component';
import {PublishCommentsComponent} from './main/publish-comments/publish-comments.component';
import {SayComponent} from './main/say/say.component';
import {SayCardComponent} from './personal/say-card/say-card.component';
import { MoreCommentComponent } from './main/more-comment/more-comment.component';
import { SetComponent } from './set/set.component';
import { FollowerComponent } from './personal/follower/follower.component';
import { FansComponent } from './personal/fans/fans.component';
import { TranspondComponent } from './personal/transpond/transpond.component';
import { CollectComponent } from './personal/collect/collect.component';
import { MyanswerComponent } from './personal/myanswer/myanswer.component';
import { SearchComponent } from './search/search.component';
//导入根路由模块
import {AppRoutingModule} from './app-routing.module';
//导入子路由
import {PersonalRoutingModule} from './personal/personal-routing.module';
import {SearchRoutingModule} from './search/search-routing.module';
//管道
import { CutPipe } from './pipes/cut.pipe';
//导入服务
import {LocalStorageService} from './services/local-storage.service';

//导入指令
import { LikeDirective } from './directives/like.directive';
import { SetNavClickDirective } from './directives/set-nav-click.directive';
import { AnswerNavClickDirective } from './directives/Answer-nav-click.directive';
import { HoverProfileDirective } from './directives/hoverProfile';
import { HoverDirective } from './directives/hover.directive';
import { ShanswerComponent } from './search/shanswer/shanswer.component';
import { ShpeopleComponent } from './search/shpeople/shpeople.component';
import { ShdailyComponent } from './search/shdaily/shdaily.component';

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
    SetComponent,
    MoreCommentComponent,
    MyanswerComponent,
    SearchComponent,LikeDirective,SetNavClickDirective,AnswerNavClickDirective,HoverProfileDirective,HoverDirective, FollowerComponent, FansComponent, TranspondComponent, CollectComponent, ShanswerComponent, ShpeopleComponent, ShdailyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SearchRoutingModule,
    PersonalRoutingModule,
    AppRoutingModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
