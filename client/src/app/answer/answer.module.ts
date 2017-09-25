import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { AnswerComponent } from './answer.component'
import { RecommendComponent } from './recommend/recommend.component';
import { InviteComponent } from './invite/invite.component';
import { HotComponent } from './hot/hot.component';
//导入路由模块
import {AnswerRoutingModule} from './answer-routing.module';





@NgModule({
  declarations: [
    AnswerComponent,

    RecommendComponent,

    InviteComponent,

    HotComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AnswerRoutingModule
  ],
  providers: [],
  bootstrap: [AnswerComponent]
})
export class AnswerModule { }
