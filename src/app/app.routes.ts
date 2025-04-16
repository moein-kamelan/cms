import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { Page404Component } from './page404/page404.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './account/auth.guard';

export const routes: Routes = [
  { path: '', title: 'users', redirectTo: 'account/signup', pathMatch: 'full' },
  {
    path: 'account',
    title: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path : "users" , title : "usersList" ,  canActivate : [authGuard] , loadChildren : () => import("./users/users.module").then(m => m.UsersModule)
  },
  
  {path : "**" , title : "page404", component : Page404Component }
];
