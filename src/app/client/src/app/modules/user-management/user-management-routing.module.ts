// user-management-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './components/user-management.component';
import { AuthGuard } from '@sunbird/core';


const routes: Routes = [
  {
    path: '', component: UserManagementComponent,
    canActivate: [AuthGuard],
    data: {
      roles: 'userManagement',
      telemetry: {
        env: 'user-management', pageid: 'user-management-page', type: 'view', uri: '/user-management'
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UserManagementRoutingModule { }
