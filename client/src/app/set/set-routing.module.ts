
import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SetComponent} from './set.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { IdPwdComponent } from './id-pwd/id-pwd.component';
import { ShieldComponent } from './shield/shield.component';
import { MailComponent } from './mail/mail.component';

const routes: Routes = [

  {
    path: 'set',
    component: SetComponent,
    children: [
      {
        path: 'basic-info',
        component: BasicInfoComponent,
      },
      {
        path: 'id-pwd',
        component:IdPwdComponent,
      },
      {
        path: 'mail',
        component:MailComponent,
      },
      {
        path: 'shield',
        component:ShieldComponent,
      },
      {
        path: '',
        component:BasicInfoComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetRoutingModule {
}
