import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { ConvertDatePipe } from '../../pipes/convert-date.pipe';
import { SortDirectionOptions } from '../../sort-direction-options';

type SortDirection = 'none' | 'asc' | 'desc';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatDialogModule,
    ConvertDatePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnDestroy {
  @Input() users: any[] = [];
  @Input() loading!: boolean;
  @Input() paginationInfos : any
  @Output() onDeleteUser = new EventEmitter();
  @Output() onChangeSortOption = new EventEmitter()

  private _snackBar = inject(MatSnackBar);
  private dialogSub!: Subscription;

  sortState: { [key: string]: SortDirection } = {
    firstName: 'none',
    lastName: 'none',
    userName: 'none',
    organizationName: 'none',
    isAuthenticated: 'none',
  };

  activeSortKey: string | null = null;

  constructor(private dialog: MatDialog, private useresService: UsersService) {}

  openDeleteDialog(userID: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      panelClass: 'dark',
      data: { id: userID },
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.useresService.DeleteUserById(result).subscribe((res) => {
          if (res) {
            this.onDeleteUser.emit();
          }
        });
      }
    });
  }

  sortList(column: string) {
    if (this.activeSortKey && this.activeSortKey !== column) {
      this.sortState[this.activeSortKey] = 'none';
    }

    const current = this.sortState[column];
    const newState: SortDirection =
      current === 'none' ? 'desc' : current === 'desc' ? 'asc' : 'none';

    this.sortState[column] = newState;
    console.log(' this.sortState[column]:', this.sortState[column]);
    this.activeSortKey = newState === 'none' ? null : column;

    if (this.sortState[column] === SortDirectionOptions.desc) {
      this.onChangeSortOption.emit({...this.paginationInfos , "orders": [
        {
          "columnName": column,
          "sort": 1
        }
      ],})
    } else if (this.sortState[column] === SortDirectionOptions.asc) {
      this.onChangeSortOption.emit({...this.paginationInfos , "orders": [
        {
          "columnName": column,
          "sort": 2
        }
      ],})
    } else {
      delete this.paginationInfos.orders
      console.log('this.paginationInfos:', this.paginationInfos)
      this.onChangeSortOption.emit({...this.paginationInfos })
    }
  }

  onResetSort() {
    if (this.activeSortKey) {
      this.sortState[this.activeSortKey] = 'none';
      this.activeSortKey = null;
    }
    if(this.paginationInfos.orders) {
      delete this.paginationInfos.orders
      this.onChangeSortOption.emit({...this.paginationInfos })
    }
    
  }

  ngOnDestroy(): void {
    this.dialogSub?.unsubscribe();
  }
}
