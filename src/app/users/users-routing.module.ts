import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';





const routes: Routes = [
  {
    path : "" ,  title : "usersList" , loadComponent: () => import('./users.component').then(m => m.UsersComponent) 
  },
  {
    path : "createNewUser" , title : "createNewUser" , loadComponent: () => import('../create-new-user/create-new-user.component').then(m => m.CreateNewUserComponent)
  },
  {
    path : "editNewUser/:id" , title : "editNewUser" , loadComponent: () => import('../edit-new-user/edit-new-user.component').then(m => m.EditNewUserComponent)
  },
  {
    path : "userDetails/:id" , title : "userDetails", loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
