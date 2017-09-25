
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TapersonalComponent} from './tapersonal.component';
import {TadailyComponent} from './tadaily/tadaily.component';
import { TaanswerComponent } from './taanswer/taanswer.component';
import { TafollowerComponent } from './tafollower/tafollower.component';
import { TafansComponent } from './tafans/tafans.component';
import { TatranspondComponent } from './tatranspond/tatranspond.component';
import { TacollectComponent } from './tacollect/tacollect.component';
import { TaproblemComponent } from './taproblem/taproblem.component';

const routes: Routes = [

  {

    path: 'index/tapersonal/:id',
    component: TapersonalComponent,
    children: [
      {
        path: 'taanswer/:id',
        component: TaanswerComponent
      }
      ,
      {
        path: 'taproblem/:id',
        component:TaproblemComponent
      },
      {
        path: '',
        component:TaanswerComponent
      }
      ,
      {
        path: 'tadaily/:id',
        component:TadailyComponent
      },
      {
        path: 'tafollower/:id',
        component:TafollowerComponent
      },
      {
        path: 'tafans/:id',
        component:TafansComponent
      },{
        path: 'tatranspond/:id',
        component:TatranspondComponent
      },
      {
        path: 'tacollect/:id',
        component:TacollectComponent
      },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TapersonalRoutingModule {
}
