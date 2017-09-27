import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
//导入组件
import { TapersonalComponent } from './tapersonal.component';
import {TadailyComponent} from './tadaily/tadaily.component';
import { TaanswerComponent } from './taanswer/taanswer.component';
import { TafollowerComponent } from './tafollower/tafollower.component';
import { TafansComponent } from './tafans/tafans.component';
import { TacollectComponent } from './tacollect/tacollect.component';
import { TaproblemComponent } from './taproblem/taproblem.component';

//导入路由模块

import {TapersonalRoutingModule} from './tapersonal-routing.module';

@NgModule({
  declarations: [
    TapersonalComponent,
    TadailyComponent,
    TaanswerComponent ,
    TafollowerComponent ,
    TafansComponent,
    TacollectComponent,
    TaproblemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TapersonalRoutingModule,
    ActivatedRoute
  ],
  providers: [],
  bootstrap: [TapersonalComponent]
})
export class TapersonalModule { }
