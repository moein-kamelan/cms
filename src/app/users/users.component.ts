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
      this.paginationInfos = paginationInfos
      this.getAllUserSub = this.usersService
      .GetAllUsersWithPagination(paginationInfos)
      .subscribe((res: any) => {
        this.users = res.data.items;
        this.totalUsersCount = res.data.totalCount;
      });

   

      
      this.usersService.usersSub.next(this.users)
    })

    this.usersService.changeSort.subscribe((sortOptions : any)  => {
      console.log("sortOprions => " , sortOptions);
      
      this.searchOption = sortOptions
      this.onChangeSearchbar("" )
    });
    
    
     
  }
 
  ngAfterViewInit(): void {
      
  }

searchOption : string = "firstName"
searchUserSub! : Subscription
  onChangeSearchbar(searchText : string) {
    const searchBody = {
      "comparisonObjects": [
        {
          "logicalComparisonOperator": 0,
          "comparisonObjects": [
            {
              "field": this.searchOption,
              "operator": 7,
              "value": searchText
            }
          ]
        }
      ],
      "orders": [
        {
          "columnName": "id",
          "sort": 2
        }
      ],
      "pageNumber": this.paginationInfos.pageNumber,
      "pageSize": this.paginationInfos.pageSize
    }
      console.log("HELLOOOO");
      
    this.searchUserSub = this.usersService.GetAllUsersWithPagination(searchBody).subscribe((res : any) => {
      
      console.log(res);
      this.users = res.data.items
      this.totalUsersCount = res.data.totalCount
    })
    
  }

  onChangeSearchOption(searchOptionSelected : string) {
    switch(searchOptionSelected) {
      case SearchOptions.firstName : {
        this.searchOption = "firstName"
        break
      }
      case SearchOptions.lastName : {
        this.searchOption = "lastName"

        break
      }
      case SearchOptions.userName : {
        this.searchOption = "userName"

        break
      }
      case SearchOptions.organizationName : {
        this.searchOption = "organizationName"

        break
      }
    }
   
    
  
  }

  ngOnDestroy(): void {
    this.getAllUserSub?.unsubscribe();
    this.searchUserSub?.unsubscribe()
  }
}
