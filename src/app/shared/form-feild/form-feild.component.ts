import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-feild',
  standalone: true,
  imports: [MaterialModule],
  template: `
    <mat-form-field class="w-full">
      <mat-label>{{ label }}</mat-label>
      <input matInput [placeholder]="placeholder"  [type]="type" />
      <mat-error *ngIf="control?.invalid && (control?.touched || control?.dirty)">
        <p class="text-sm relative top-[-18px] text-red-500 dark:text-yellow-600">
          <ng-container *ngIf="control?.hasError('required')">
            مقداری وارد نشده
          </ng-container>
          <ng-container *ngIf="control?.hasError('minlength')">
            حداقل کاراکتر مجاز {{ minlength }} عدد
          </ng-container>
          <ng-container *ngIf="control?.hasError('maxlength')">
            حداکثر کاراکتر مجاز {{ maxlength }} عدد
          </ng-container>
          <ng-container *ngIf="control?.hasError('pattern')">
            <ng-container *ngIf="exactlength">
              باید {{ exactlength }} رقمی باشد
            </ng-container>
            <ng-container *ngIf="isMobileNumber">
              فرمت شماره درست نمیباشد
            </ng-container>
            <ng-container *ngIf="!exactlength && !isMobileNumber">
              رمز باید شامل حداقل یک حرف بزرگ ، یک کاراکتر خاص و یک عدد باشد
            </ng-container>
          </ng-container>
        </p>
      </mat-error>
    </mat-form-field>
  `,
  styleUrl: './form-feild.component.css',
})
export class FormFeildComponent implements OnChanges {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';

  @Input() control!: AbstractControl<any, any> | null;
@Input() formControlName! : FormControl

  @Input() minlength: number = 0;
  @Input() maxlength: number = 0;
  @Input() exactlength: number = 0;
  @Input() isMobileNumber: boolean = false;
  

  ngOnChanges(changes: SimpleChanges): void {
    console.log('control => ', this.control?.invalid);
  }
}
