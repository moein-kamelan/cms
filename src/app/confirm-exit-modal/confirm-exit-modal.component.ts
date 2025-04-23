import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {
  MatDialogRef,
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-exit-modal',
  imports: [MaterialModule , 
MatDialogActions,
MatDialogClose,
MatDialogContent,
MatDialogTitle,
  ],
  templateUrl: './confirm-exit-modal.component.html',
  styleUrl: './confirm-exit-modal.component.css',
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class ConfirmExitModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmExitModalComponent>);

  constructor(private router : Router) {

  }

  onConfirm() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    this.router.navigate(["/account/login"])
  }
  
}
