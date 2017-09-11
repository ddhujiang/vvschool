
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';               //导入路由模块

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import {RegistComponent} from './regist/regist.component';
import {PageNotFoundComponent } from './page-not-found/page-not-found.component';
const routes: Routes = [
  {
    path: 'index/:val',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },{
    path:'regist',
    component:RegistComponent
  },
  {
    path: '',
    redirectTo: '/regist',       //重定向路由
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],          //forRoot根路由
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
