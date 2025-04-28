import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-delete-confirm-dialog',
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle, 
  MaterialModule],
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrl: './delete-confirm-dialog.component.css'
})
export class DeleteConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number}
  ) {}

  onCancel() {
    this.dialogRef.close();
  }

  onConfirm() {
    
    this.dialogRef.close( this.data.id );
  }
}
