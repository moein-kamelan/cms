import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { Subscription, Subject, of } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { UsersService } from '../services/users.service';
import { TableComponent } from './table/table.component';
import { MaterialModule } from '../material.module';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchOptions } from '../enums/search-options';
import { routes } from '../app.routes';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserBtnComponent } from "../create-user-btn/create-user-btn.component";
import { RefreshTableBtnComponent } from "../refresh-table-btn/refresh-table-btn.component";
import { SearchbarComponent } from './searchbar/searchbar.component';
import { PaginationComponent } from './pagination/pagination.component';
@Component({
  selector: 'app-users-info',
  standalone: true,
  imports: [
    TableComponent,
    MaterialModule,
    RouterModule,
    CreateUserBtnComponent,
    RefreshTableBtnComponent,
    SearchbarComponent,
    PaginationComponent
    
],
  templateUrl: './Info.component.html',
  styleUrl: './Info.component.css',
})
export class InfoComponent implements OnInit, OnDestroy {
  @ViewChild("searchbarComp") searchbarComp! : ElementRef
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
      } else {
        console.log('داده ها بارگزاری نشد');
      }

      this.loading = false;

    }, 2000);

      
    
  }

  updateTable() {
    this.usersService
      .GetAllUsersWithPagination(this.paginationInfos)
      .subscribe((res: any) => {
        this.users = res.data.items;
        this.currentPage = this.paginationInfos.pageNumber;
        this.pageCount = Math.ceil(
          res.data.totalCount / this.paginationInfos.pageSize
        );
      });
  }

  onreloadTable() {
    this.loading = true;

    setTimeout(() => {
      this.updateTable();

      this.loading = false;
    }, 2000);
  }

  onChangeSortOptions(newpaginationInfos: any) {
   this.paginationInfos = newpaginationInfos;
    this.updateTable();
  }

  onchangePagination(newpaginationInfos: any) {
    this.paginationInfos = newpaginationInfos;
    this.updateTable();
  }

  onChangeSearchbar(newpaginationInfos : any) {
    this.paginationInfos = newpaginationInfos
    this.updateTable()
    console.log('newpaginationInfos:', newpaginationInfos)
    
    // this.updateTable()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
