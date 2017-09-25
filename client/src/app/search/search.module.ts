import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute} from "@angular/router";
//导入组件
import {SearchComponent} from"./search.component";
import { ShanswerComponent } from './shanswer/shanswer.component';
import { ShpeopleComponent } from './shpeople/shpeople.component';
import { ShdailyComponent } from './shdaily/shdaily.component';
//导入路由模块
import {SearchRoutingModule} from './search-routing.module';

@NgModule({
  declarations: [
    SearchComponent,
    ShanswerComponent,
    ShpeopleComponent,
    ShdailyComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    SearchRoutingModule,
    ActivatedRoute
  ],
  providers: [],
  bootstrap: [SearchComponent]
})
export class SearchModule { }
