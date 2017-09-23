import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
//导入组件
import { PersonalComponent } from './personal.component';
import {SayCardComponent} from './say-card/say-card.component';
import { MyanswerComponent } from './myanswer/myanswer.component';
import { FollowerComponent } from './follower/follower.component';
import { FansComponent } from './fans/fans.component';
import { TranspondComponent } from './transpond/transpond.component';
import { CollectComponent } from './collect/collect.component';

//导入路由模块

import {PersonalRoutingModule} from './personal-routing.module';



@NgModule({
  declarations: [
    PersonalComponent,
    SayCardComponent,
    MyanswerComponent,
    FollowerComponent,
    FansComponent,
    TranspondComponent,
    CollectComponent
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
