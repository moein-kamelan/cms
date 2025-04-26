import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
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
export class UsersComponent implements OnInit, OnDestroy {
  users: any = [];
  pageCount: number = 1;
  currentPage: number = 1;
  paginationInfos: { pageNumber: number; pageSize: number } = {
    pageNumber: 1,
    pageSize: 5,
  };
  loading: boolean = true;
  private _snackBar = inject(MatSnackBar);

  private destroy$ = new Subject<void>();
  searchOption: string = 'firstName';

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      const resolveData = this.route.snapshot.data['usersData'];
      console.log('resolveData:', resolveData);

      if (resolveData) {
        this.users = resolveData.data.items;
        this.currentPage = this.paginationInfos.pageNumber;
        this.pageCount = Math.ceil(
          resolveData.data.totalCount / this.paginationInfos.pageSize
        );
        console.log('this.pageCount:', this.pageCount);
      } else {
        console.log('داده ها بارگزاری نشد');
      }

      this.loading = false;
    }, 2000);
  }

  updatePage() {
    this.usersService.GetAllUsersWithPagination(this.paginationInfos).subscribe((res : any) =>  {
      this.users = res.data.items
      this.currentPage = this.paginationInfos.pageNumber
      this.pageCount =  Math.ceil(res.data.totalCount / this.paginationInfos.pageSize)
     })
  }

  onreloadTable() {
    this.loading = true

    setTimeout(() => {
      this.updatePage()

      this.loading = false;
    }, 2000);
  }


  onChangeSortOptions(newpaginationInfos : any) {
  // console.log('newSortOption:', newSortOption)
  this.paginationInfos = newpaginationInfos
  this.updatePage()


  }


  onchangePagination(infos: any) {
    this.paginationInfos = infos
   this.updatePage()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
