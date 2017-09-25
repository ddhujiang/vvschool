
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonalComponent} from './personal.component';
import {SayCardComponent} from './say-card/say-card.component';
import { MyanswerComponent } from './myanswer/myanswer.component';
import { FollowerComponent } from './follower/follower.component';
import { FansComponent } from './fans/fans.component';
import { TranspondComponent } from './transpond/transpond.component';
import { CollectComponent } from './collect/collect.component';

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
        path: '',
        component:SayCardComponent
      },
      {
        path: 'say-card/:id',
        component:SayCardComponent
      },
      {
        path: 'follower/:id',
        component:FollowerComponent
      },
      {
        path: 'fans/:id',
        component:FansComponent
      },{
        path: 'transpond/:id',
        component:TranspondComponent
      },
      {
        path: 'collect/:id',
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
