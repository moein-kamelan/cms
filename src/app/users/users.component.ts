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
    HeaderComponent,
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
  
  hardCdeUsers: any = [
    {
      id: 1,
      firstName: 'moein',
      lastName: 'kamelan',
      userName: 'moein980',
      organizationName: 'asdfs',
    },
    {
      id: 2,
      firstName: 'ali',
      lastName: 'erfani',
      userName: 'alierf',
      organizationName: 'alidfwef',
    },
    {
      id: 3,
      firstName: 'mohsen',
      lastName: 'karimi',
      userName: 'mohkar',
      organizationName: 'adfsdfsa',
    },
    {
      id: 4,
      firstName: 'mahdi',
      lastName: 'kalbasi',
      userName: 'mahkal8',
      organizationName: 'efghdfgvfd',
    },
    {
      id: 5,
      firstName: 'erfan',
      lastName: 'khosravi',
      userName: 'erf89',
      organizationName: 'dfasdfsd',
    },
    {
      id: 6,
      firstName: 'maryam',
      lastName: 'naderi',
      userName: 'marnad',
      organizationName: 'dfasdfwec',
    },
    {
      id: 7,
      firstName: 'hossein',
      lastName: 'marani',
      userName: 'gfsdfgvds',
      organizationName: '3e4q23fded',
    },
    {
      id: 8,
      firstName: 'hasan',
      lastName: 'ahvazi',
      userName: 'hasanah342',
      organizationName: 'dafsf',
    },
  ];

  paginationInfos: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };

  constructor(private usersService: UsersService) {}
  private getAllUserSub!: Subscription;

  pageCount: number = 0;
  startItem: number = 0;
  endItem: number = 0;
  currentItems: any[] = [];

  ngOnInit(): void {
    this.updatePageAndItems();
    this.getAllUserSub = this.getAllUserSub = this.usersService
      .GetAllUsersWithPagination(this.paginationInfos)
      .subscribe((res: any) => {
        this.users = res.data.items;
        console.log('this.users:', this.users);
      });
  }
 
  ngAfterViewInit(): void {
      
  }

  updatePageAndItems() {
    this.pageCount = Math.ceil(
      this.hardCdeUsers.length / this.paginationInfos.pageSize
    );
    this.endItem =
      this.paginationInfos.pageNumber * this.paginationInfos.pageSize;
    this.startItem = this.endItem - this.paginationInfos.pageSize;
    this.currentItems = this.hardCdeUsers.slice(this.startItem, this.endItem);
  }

  incrementPageCount() {
    ++this.paginationInfos.pageNumber;
    this.updatePageAndItems();
    //   console.log('this.paginationInfos:', this.paginationInfos);
    // console.log('currentItems:', this.currentItems)
    // console.log('startItem:', this.startItem)
    // console.log('endItem:', this.endItem)
  }
  decrementPageCount() {
    --this.paginationInfos.pageNumber;
    this.updatePageAndItems();

    //   console.log('this.paginationInfos:', this.paginationInfos);
    // console.log('currentItems:', this.currentItems)
  }

  changePageCount(pageIndex: number) {
    this.paginationInfos.pageNumber = pageIndex;
    this.updatePageAndItems();

    //   console.log('this.paginationInfos:', this.paginationInfos);
    // console.log('currentItems:', this.currentItems)
  }

  onChangeItemPerPage(itemPerPageValue: number) {
    this.paginationInfos.pageSize = itemPerPageValue;
    console.log(
      'this.paginationInfos.pageSize:',
      this.paginationInfos.pageSize
    );
    this.updatePageAndItems()
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
