import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
//导入组件
import { PersonalComponent } from './personal.component';
import {MyDailyComponent} from './myDaily/myDaily.component';
import { MyanswerComponent } from './myanswer/myanswer.component';
import { FollowerComponent } from './follower/follower.component';
import { FansComponent } from './fans/fans.component';
import { CollectComponent } from './collect/collect.component';
import { ProblemComponent } from './problem/problem.component';

//导入路由模块

import {PersonalRoutingModule} from './personal-routing.module';



@NgModule({
  declarations: [
    PersonalComponent,
    MyanswerComponent,
    FollowerComponent,
    FansComponent,
    CollectComponent,
    ProblemComponent,
    MyDailyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalRoutingModule,
    ActivatedRoute
  ],
  providers: [],
  bootstrap: [PersonalComponent]
})
export class PersonalModule { }
