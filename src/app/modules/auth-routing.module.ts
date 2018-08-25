import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthTabComponent } from '../components/auth-tab/auth-tab.component';

const routes: Routes = [{ path: '', component: AuthTabComponent }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
