
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
        path: 'myanswer',
        component: MyanswerComponent
      },
      {
        path: 'say-card',
        component:SayCardComponent
      },
      {
        path: 'follower',
        component:FollowerComponent
      },
      {
        path: 'fans',
        component:FansComponent
      },{
        path: 'transpond',
        component:TranspondComponent
      },
      {
        path: 'collect',
        component:CollectComponent
      },

      {
        path: '',
        component:MyanswerComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalRoutingModule {
}
