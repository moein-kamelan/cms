import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const routes: Routes = [
  {path : "" , loadComponent: () => import('./account.component').then(m => m.AccountComponent) , children : [
    {path : "login" , title : "login" , loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)},
    {path : "signup" , title : "signup" , loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent)}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
