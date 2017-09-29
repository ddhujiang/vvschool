import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'


import  {SetComponent} from './set.component'
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { IdPwdComponent } from './id-pwd/id-pwd.component';
import { ShieldComponent } from './shield/shield.component';
import { MailComponent } from './mail/mail.component';
//导入路由模块
import {SetRoutingModule} from './set-routing.module';




@NgModule({
  declarations: [
    SetComponent,

  BasicInfoComponent,

  IdPwdComponent,

  ShieldComponent,

  MailComponent],
  imports: [
    BrowserModule,
    FormsModule,
    SetRoutingModule
  ],
  providers: [],
  bootstrap: [SetComponent]
})
export class SetModule { }
