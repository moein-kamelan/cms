import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { UsersService } from '../services/users.service';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TableComponent } from './table/table.component';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [
    HeaderComponent,
    PaginationComponent,
    SearchbarComponent,
    TableComponent,
    MaterialModule,
    RouterModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any = [];
  hardCdeUsers : any = [
    {id : 1 ,  firstName : "moein" , lastName : "kamelan" ,  userName : "moein980" , organizationName : "asdfs" },
    {id : 2 ,  firstName : "ali" , lastName : "erfani" ,  userName : "alierf" , organizationName : "alidfwef" },
    {id : 3 ,  firstName : "mohsen" , lastName : "karimi" ,  userName : "mohkar" , organizationName : "adfsdfsa" },
    {id : 4 ,  firstName : "mahdi" , lastName : "kalbasi" ,  userName : "mahkal8" , organizationName : "efghdfgvfd" },
    {id : 5 ,  firstName : "erfan" , lastName : "khosravi" ,  userName : "erf89" , organizationName : "dfasdfsd" },
    {id : 6 ,  firstName : "maryam" , lastName : "naderi" ,  userName : "marnad" , organizationName : "dfasdfwec" },
    {id : 7 ,  firstName : "hossein" , lastName : "marani" ,  userName : "gfsdfgvds" , organizationName : "3e4q23fded" },
    {id : 8 ,  firstName : "hasan" , lastName : "ahvazi" ,  userName : "hasanah342" , organizationName : "dafsf" },
  ]

  paginationInfosFake: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };
  pageCount = Math.ceil(this.hardCdeUsers.length / this.paginationInfosFake.pageSize)
  
  paginationInfos: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };
  constructor(private usersService: UsersService) {}
  private getAllUserSub!: Subscription;
  ngOnInit(): void {
    this.getAllUserSub = this.getAllUserSub = this.usersService
      .GetAllUsersWithPagination(this.paginationInfos)
      .subscribe((res: any) => {
        this.users = res.data.items;
        console.log('this.users:', this.users);
      });
  }

  ngOnDestroy(): void {
    this.getAllUserSub?.unsubscribe();
  }
}
