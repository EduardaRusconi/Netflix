import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { loginComponent } from "src/app/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: loginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
