import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersCRUDComponent } from './users-crud/users-crud.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path : "" ,  title : "usersList" , component : UsersComponent 
  },
  {
    path : "usersCRUD" , title : "usersCRUD" , component : UsersCRUDComponent
  },
  {
    path : "usersCRUD/userDetails" , title : "userDetails", component : UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
