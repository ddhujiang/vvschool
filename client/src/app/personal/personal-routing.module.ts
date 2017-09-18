
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonalComponent} from './personal.component';
import {CommentComponent} from './comment/comment.component';
import {SayCardComponent} from './say-card/say-card.component';
const routes: Routes = [

  {
    path: 'personal',
    component: PersonalComponent,
    children: [
      {
        path: 'comment',
        component: CommentComponent,
      },
      {
        path: 'say-card',
        component:SayCardComponent,
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
