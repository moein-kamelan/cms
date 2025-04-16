import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';

import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
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



@Component({
  selector: 'app-table',
  imports: [CommonModule , MaterialModule , RouterModule , MatDialogModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnChanges{
@Input() users:any[] = []


constructor(private dialog: MatDialog ,private useresService : UsersService) {

}

ngOnChanges(changes: SimpleChanges): void {
  
  console.log("this.users in table => " , this.users);
  
}


openDeleteDialog(userID : any) {
  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    width: '400px',
    data: {id : userID}  
  });

  dialogRef.afterClosed().subscribe(result => {
    if(result) {
      console.log('result:', result)
      
      this.useresService.DeleteUserById(result).subscribe(res => {
        console.log(res);
        
      })
      
    }
    
  });




}}
