
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonalComponent} from './personal.component';
import {MyDailyComponent} from './myDaily/myDaily.component';
import { MyanswerComponent } from './myanswer/myanswer.component';
import { FollowerComponent } from './follower/follower.component';
import { FansComponent } from './fans/fans.component';
import { CollectComponent } from './collect/collect.component';
import { ProblemComponent } from './problem/problem.component';

const routes: Routes = [

  {
    path: 'personal',
    component: PersonalComponent,
    children: [
      {
        path: 'myanswer/:id',
        component: MyanswerComponent
      },
      {
        path: 'problem/:id',
        component: ProblemComponent
      },
      {
        path: '',
        component:CollectComponent
      },
      {
        path: 'myDaily',
        component:MyDailyComponent
      },
      {
        path: 'follower',
        component:FollowerComponent
      },
      {
        path: 'fans',
        component:FansComponent
      },
      {
         path: 'collect',
  component:CollectComponent
},

]
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
