import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchOptions } from '../enums/search-options';
import { routes } from '../app.routes';

@Component({
  selector: 'app-users',
  standalone: true,
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
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit {
  users: any = [];
  totalUsersCount: number = 0;
  paginationInfos: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };
  loading: boolean = true

  private destroy$ = new Subject<void>();
  searchOption: string = 'firstName';

  constructor(private usersService: UsersService , private route : ActivatedRoute) {}

  ngOnInit(): void {
    // this.usersService.paginationSub
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((paginationInfos: any) => {
    //     this.paginationInfos = paginationInfos;

    //     this.usersService
    //       .GetAllUsersWithPagination(paginationInfos)
    //       .pipe(takeUntil(this.destroy$))
    //       .subscribe((res: any) => {
    //         this.users = res.data.items;
    //         this.totalUsersCount = res.data.totalCount;

    //       });
    //   });

    const resolveData = this.route.snapshot.data["usersData"]
    console.log('resolveData:', resolveData)

    if(resolveData) {
      this.users = resolveData.data.items
      this.totalUsersCount = resolveData.data.totalCount
    } else {
      console.log("داده ها بارگزاری نشد");
      
    }

    this.loading = false

    this.usersService.usersSub
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          
          this.usersService
            .GetAllUsersWithPagination(this.paginationInfos)
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: any) => {
              this.users = users.data.items;
            });

   
          
        }
      });

    this.usersService.changeSort
      .pipe(takeUntil(this.destroy$))
      .subscribe((sortOptions: any) => {
        console.log('sortOptions =>', sortOptions);
        this.searchOption = sortOptions;
        this.changeSort(sortOptions)
        
        
      });
  }

  changeSort(sortOption : string) {
    const searchBody = {
      
      orders: [
        {
          columnName: sortOption,
          sort: 2,
        },
      ],
      pageNumber: this.paginationInfos.pageNumber,
      pageSize: this.paginationInfos.pageSize,
    };
    
    this.usersService.GetAllUsersWithPagination(searchBody).pipe(takeUntil(this.destroy$)).subscribe((res : any) => {
      this.users = res.data.items;
      this.totalUsersCount = res.data.totalCount;

    })
    
  }
  
  onChangeSearchbar(searchText: string) {
    const searchBody = {
      comparisonObjects: [
        {
          logicalComparisonOperator: 0,
          comparisonObjects: [
            {
              field: this.searchOption,
              operator: 7,
              value: searchText,
            },
          ],
        },
      ],
      orders: [
        {
          columnName: 'id',
          sort: 2,
        },
      ],
      pageNumber: this.paginationInfos.pageNumber,
      pageSize: this.paginationInfos.pageSize,
    };

    this.usersService
      .GetAllUsersWithPagination(searchBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.users = res.data.items;
        this.totalUsersCount = res.data.totalCount;
      });
  }

  onChangeSearchOption(searchOptionSelected: string) {
    switch (searchOptionSelected) {
      case SearchOptions.firstName:
        this.searchOption = 'firstName';
        break;
      case SearchOptions.lastName:
        this.searchOption = 'lastName';
        break;
      case SearchOptions.userName:
        this.searchOption = 'userName';
        break;
      case SearchOptions.organizationName:
        this.searchOption = 'organizationName';
        break;
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
