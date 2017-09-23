
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
//导入组件
import {SearchComponent} from"./search.component"
import { ShanswerComponent } from './shanswer/shanswer.component';
import { ShpeopleComponent } from './shpeople/shpeople.component';
import { ShdailyComponent } from './shdaily/shdaily.component';

const routes: Routes = [

  {
    path: 'search/:id',
    component: SearchComponent,
    children: [
      {
        path: 'shanswer/:id',
        component: ShanswerComponent
      },
      {
        path: '',
        component:ShanswerComponent
      },
      {
        path: 'shpeople',
        component:ShpeopleComponent
      },
      {
        path: 'shdaily',
        component:ShdailyComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {
}
