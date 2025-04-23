import { AfterViewInit, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { PaginationComponent } from './pagination/pagination.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchOptions } from '../enums/search-options';
import { routes } from '../app.routes';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  loading: boolean = true;
  private _snackBar = inject(MatSnackBar)

  private destroy$ = new Subject<void>();
  searchOption: string = 'firstName';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const resolveData = this.route.snapshot.data['usersData'];

      if (resolveData) {
        this.users = resolveData.data.items;
        this.totalUsersCount = resolveData.data.totalCount;
      } else {
        console.log('داده ها بارگزاری نشد');
      }

      this.loading = false;
    }, 2000);

    

    this.usersService.changePageSub.subscribe((res : any) => {
      this.usersService.GetAllUsersWithPagination(res).pipe().subscribe((users : any) => {
        this.users = users.data.items;
        this.totalUsersCount = users.data.totalCount;
        
      })
      
    })

    this.usersService.usersSub
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res) {
          this.usersService
            .GetAllUsersWithPagination(this.paginationInfos)
            .pipe(takeUntil(this.destroy$) , catchError((err : any) => {
              this._snackBar.open(err.message , "متوجه شدم")
              return of(null)
            }))
            .subscribe((users: any) => {
              this.users = users.data.items;
            });
        }
      });

    this.usersService.changeSortSub
      .pipe(takeUntil(this.destroy$)  , catchError((err : any) => {
        this._snackBar.open(err.message , "متوجه شدم")
        return of(null)
      }))
      .subscribe((sortOptions: any) => {
        console.log('sortOptions =>', sortOptions);
        this.searchOption = sortOptions;
        this.changeSortSub(sortOptions);
      });
  }
  


  reloadTable() {
      this.loading = true;
      const currentPagination = this.usersService.paginationSub.getValue();
      const body = {
        pageNumber: currentPagination.pageNumber,
        pageSize: currentPagination.pageSize,
      };
    
      this.usersService
        .GetAllUsersWithPagination(body)
        .pipe(takeUntil(this.destroy$) , catchError((err : any) => {
          this._snackBar.open(err.message , "متوجه شدم")
          return of(null)
        })).subscribe((res: any) => {
          setTimeout(() => {
            this.users = res.data.items;
            this.totalUsersCount = res.data.totalCount;
            this.loading = false;
          }, 2000);
          
          
        })
    

  }

  changeSortSub(sortOption: string) {
    const currentPaginationInfos = this.usersService.paginationSub.getValue()
    const searchBody = {
      orders: [
        {
          columnName: sortOption,
          sort: 2,
        },
      ],
      pageNumber: currentPaginationInfos.pageNumber,
      pageSize: currentPaginationInfos.pageSize,
    };

    this.usersService
      .GetAllUsersWithPagination(searchBody)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: any) => {
        this.users = res.data.items;
        this.totalUsersCount = res.data.totalCount;
      });
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
     
      pageNumber: this.paginationInfos.pageNumber,
      pageSize: this.paginationInfos.pageSize,
    };

    this.usersService
      .GetAllUsersWithPagination(searchBody)
      .pipe(takeUntil(this.destroy$) , catchError((err : any) => {

        this._snackBar.open(err.message , "متوجه شدم" )
        
        return of(null)
      }))
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
