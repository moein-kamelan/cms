import { Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { Page404Component } from './page404/page404.component';

export const routes: Routes = [
  { path: '', title: 'users', redirectTo: 'account/signup', pathMatch: 'full' },
  {
    path: 'account',
    title: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {path : "**" , title : "page404", component : Page404Component }
];
