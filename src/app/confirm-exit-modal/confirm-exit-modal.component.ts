import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-exit-modal',
  imports: [MaterialModule , 
  ],
  templateUrl: './confirm-exit-modal.component.html',
  styleUrl: './confirm-exit-modal.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class ConfirmExitModalComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmExitModalComponent>);
}
