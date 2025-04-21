import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

import { ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { SearchOptions } from '../../enums/search-options';
@Component({
  selector: 'app-table',
  imports: [CommonModule, MaterialModule, RouterModule, MatDialogModule  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges , OnDestroy {
  @Input() users: any[] = [];

  constructor(private dialog: MatDialog, private useresService: UsersService) {}

  ngOnChanges(changes: SimpleChanges): void {
  }

  private dialogSub!: Subscription;

  openDeleteDialog(userID: any) {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
      width: '400px',
      panelClass : "dark" ,
      data: { id: userID },
    });

    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        this.useresService.DeleteUserById(result).subscribe((res) => {
          this.useresService.usersSub.next(res)
        });

      }
    });
  }

  sortList(sortOption : string) {
    this.useresService.emitSortOption(sortOption)
    
    
  }

ngOnDestroy(): void {
    this.dialogSub?.unsubscribe()
}  
  
}
