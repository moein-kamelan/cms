import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { UsersService } from '../services/users.service';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TableComponent } from './table/table.component';
import { Subscription } from 'rxjs';
import { MaterialModule } from '../material.module';
import { RouterModule } from '@angular/router';
import { SearchOptions } from '../enums/search-options';

@Component({
  selector: 'app-users',
  imports: [
    PaginationComponent,
    SearchbarComponent,
    TableComponent,
    MaterialModule,
    RouterModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy , AfterViewInit {

  users: any = [];
  totalUsersCount : number = 0
  

  paginationInfos: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };

  constructor(private usersService: UsersService) {}
  private getAllUserSub!: Subscription;


  ngOnInit(): void {

    this.usersService.paginationSub.subscribe((paginationInfos : any) => {
      
      this.getAllUserSub = this.usersService
      .GetAllUsersWithPagination(paginationInfos)
      .subscribe((res: any) => {
        this.users = res.data.items;
        this.totalUsersCount = res.data.totalCount;
      });

      
      this.usersService.usersSub.next(this.users)
    })


    
    
     
  }
 
  ngAfterViewInit(): void {
      
  }



  onChangeSearchbar(searchText : string) {
    console.log('searchText:', searchText)
    
  }

  onChangeSearchOption(searchOption : string) {
    console.log("searchOption => " , searchOption);
    console.log(SearchOptions.lastName);
    
    switch(searchOption) {
      case SearchOptions.firstName : {
        

        break
      }
      case SearchOptions.lastName : {
        

        break
      }
      case SearchOptions.userName : {
        

        break
      }
      case SearchOptions.organizationName : {
        

        break
      }
    }
    
  }

  ngOnDestroy(): void {
    this.getAllUserSub?.unsubscribe();
  }
}
