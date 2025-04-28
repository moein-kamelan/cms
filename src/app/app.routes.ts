import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

import { InfoComponent } from './users-info/Info.component';
import { authGuard } from './account/auth.guard';
import { usersGuard } from './account/users.guard';
import { LoginComponent } from './account/login/login.component';
import { SignupComponent } from './account/signup/signup.component';
import { Users } from './users/users.component';
import { EditNewUserComponent } from './edit-new-user/edit-new-user.component';
import { CreateNewUserComponent } from './create-new-user/create-new-user.component';
import { UserDetailsComponent } from './users-info/user-details/user-details.component';
import { currentUserResolver } from './current-user.resolver';
import { usersResolver } from './resolvers/users.resolver';
import { userDetailsResolver } from './resolvers/user-details.resolver';

export const routes: Routes = [
  { path: '', title: 'users', redirectTo: 'account/login', pathMatch: 'full' },

  { path : "account" , title : "account", canActivate : [usersGuard] ,loadChildren : () => import("./account/account.module").then(m => m.AccountModule)},
    
  {path : "users" , title : "users" , canActivate  : [authGuard] , loadChildren : () => import("./users-info/users.module").then(m => m.UsersModule)},
  
  {path : "**" , title : "page404", loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component) }
];

