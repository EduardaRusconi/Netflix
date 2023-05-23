import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashboardComponent } from "./dashboard/dashboard.component";
import { configurationComponent } from "./configuration/configuration.component";
import { AuthGuard } from 'src/helpers/auth.guard';
import { LoadChildHelper } from 'src/login-modules/load-child-helper';

/* #region Rotas*/
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => LoadChildHelper.defaultLoadChild() },
  { path: 'login/azure/:client', loadChildren: () => LoadChildHelper.azureLoadChild() },
  { path: 'dashboard', component: dashboardComponent, canActivate: [AuthGuard] },
  { path: 'configuration', component: configurationComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' },
];
/* #ednregion */

/* #region NgModule */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
/* #ednregion */
export class appRoutingModule { }
