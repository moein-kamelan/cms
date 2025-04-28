import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { userDetailsResolver } from '../resolvers/user-details.resolver';
import { usersResolver } from '../resolvers/users.resolver';
import { currentUserResolver } from '../current-user.resolver';





const routes: Routes = [
  {
    path : "" ,  title : "usersList" ,  loadComponent : () => import("../users/users.component").then(m => m.Users) ,resolve : {userData : currentUserResolver} , children : [
      {
        path : "usersInfo" , title : "usersInfo" , loadComponent: () => import('../users-info/usersInfo.component').then(m => m.UsersInfoComponent) , resolve : {usersData : usersResolver}
      },
      {
        path : "create" , title : "createNewUser" , loadComponent: () => import('../create-new-user/create-new-user.component').then(m => m.CreateNewUserComponent)
      },
      {
        path : "edit/:id" , title : "editUser" , resolve : {userData : userDetailsResolver}, loadComponent: () => import('../edit-new-user/edit-new-user.component').then(m => m.EditNewUserComponent)
      },
      {
        path : "details/:id" , title : "userDetails",  resolve : {userData : userDetailsResolver} ,   loadComponent: () => import('./user-details/user-details.component').then(m => m.UserDetailsComponent)
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
