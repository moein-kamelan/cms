import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

import { UsersComponent } from './users/users.component';
import { authGuard } from './account/auth.guard';
import { usersGuard } from './account/users.guard';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { UmpComponent } from './ump/ump.component';
import { EditNewUserComponent } from './edit-new-user/edit-new-user.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { currentUserResolver } from './current-user.resolver';
import { usersResolver } from './resolvers/users.resolver';
import { userDetailsResolver } from './resolvers/user-details.resolver';

export const routes: Routes = [
  { path: '', title: 'users', redirectTo: 'account/login', pathMatch: 'full' },

  { path : "account" , title : "account", component:AccountComponent , children : [
    {path : "login" , title : "login" , component : LoginComponent},
    {path : "signup" , title : "signup" , component : SignupComponent}
  ]},
    
  {path : "ump" , title : "ump"  , component : UmpComponent , resolve : {userData : currentUserResolver } , children : [
    {path : "usersInfo" , title : "usersInfo" , component : UsersComponent , resolve : {usersData : usersResolver}},
    {path : "editUser/:id" , title : "editUser" , component : EditNewUserComponent , resolve : {userData : userDetailsResolver}},
    {path : "createNewUser" , title : "usersInfo" , component : CreateNewUserComponent},
    {path : "userDetails/:id" , title : "userDetails" , component : UserDetailsComponent , resolve : {userData : userDetailsResolver}},
  ]},

  
  {path : "**" , title : "page404", loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component) }
];

