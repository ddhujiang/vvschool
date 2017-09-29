import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';               //导入路由模块

import {IndexComponent} from './index/index.component';
import {LoginComponent} from './login/login.component';
import {RegistComponent} from './regist/regist.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ClubComponent} from './club/club.component';
import {ConfessionComponent} from './confession/confession.component';
import {DailyComponent} from './daily/daily.component';
import {ProblemDetailComponent} from './problem-detail/problem-detail.component';
import {AnswerComponent} from './answer/answer.component';
 import { SetComponent } from './set/set.component';
import { AnswerProblemComponent } from './answer-problem/answer-problem.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexComponent
  },
  // {
  //   path: 'search/:id',
  //   component: SearchComponent
  // }
  // ,
  {
    path:'set',
    component:SetComponent
  },
  {
    path: 'club',
    component: ClubComponent
  },
  {
    path: 'confession',
    component: ConfessionComponent
  },
  {
    path: 'daily',
    component: DailyComponent
  },
  {
    path: 'problem-detail/:id',
    component: ProblemDetailComponent
  },
  {
    path: 'answer-problem/:id',
    component: AnswerProblemComponent
  },
  {
    path: 'answer',
    component: AnswerComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'regist',
    component: RegistComponent
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
  imports: [RouterModule.forRoot(routes)],          //forRoot根路由
  exports: [RouterModule]
})
export class AppRoutingModule {
}
