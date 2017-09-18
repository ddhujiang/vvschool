import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

import { PersonalComponent } from './personal.component';
import { CommentComponent } from './comment/comment.component';
import {SayCardComponent} from './say-card/say-card.component';


//导入路由模块

import {PersonalRoutingModule} from './personal-routing.module';



@NgModule({
  declarations: [
    PersonalComponent,
    CommentComponent,
    SayCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalRoutingModule
  ],
  providers: [],
  bootstrap: [PersonalComponent]
})
export class PersonalModule { }
