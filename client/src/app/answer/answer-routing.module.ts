
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AnswerComponent } from './answer.component'
import { RecommendComponent } from './recommend/recommend.component';
import { InviteComponent} from './invite/invite.component';
import { HotComponent } from './hot/hot.component';


const routes: Routes = [

  {
    path: 'answer',
    component: AnswerComponent,
    children: [
      {
        path: 'recommend',
        component: RecommendComponent,
      },
      {
        path: 'hot',
        component:HotComponent,
      },
      {
        path: 'invite',
        component:InviteComponent,
      },
      {
        path: '',
        component:RecommendComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnswerRoutingModule {
}
