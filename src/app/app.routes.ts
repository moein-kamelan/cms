import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';

import { UsersComponent } from './users/users.component';
import { authGuard } from './account/auth.guard';
import { usersGuard } from './account/users.guard';

export const routes: Routes = [
  { path: '', title: 'users', redirectTo: 'account/login', pathMatch: 'full' },
  {
    path: 'account',
    title: 'account',
    canActivate : [usersGuard],
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path : "users" , title : "usersList" , canActivate : [authGuard] ,loadChildren : () => import("./users/users.module").then(m => m.UsersModule)
  },
  
  {path : "**" , title : "page404", loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component) }
];
