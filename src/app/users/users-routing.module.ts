import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CreateNewUserComponent } from '../create-new-user/create-new-user.component';
import { EditNewUserComponent } from '../edit-new-user/edit-new-user.component';

const routes: Routes = [
  {
    path : "" ,  title : "usersList" , component : UsersComponent 
  },
  {
    path : "createNewUser" , title : "createNewUser" , component : CreateNewUserComponent
  },
  {
    path : "editNewUser" , title : "editNewUser" , component : EditNewUserComponent
  },
  {
    path : "userDetails" , title : "userDetails", component : UserDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
