import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-error-message',
  imports: [MaterialModule],
  template: `
    <p class='text-sm relative top-[-18px] text-red-500 dark:text-yellow-600'>
    @if ( control?.invalid && (control?.touched || control?.dirty) ) { @if
    (control?.hasError('required')) {
    <ng-container>مقداری وارد نشده</ng-container>
    } @else if (control?.hasError("minlength")) {
    <ng-container>حداقل کاراکتر مجاز {{ minlength }} عدد</ng-container>

    }@else if (control?.hasError("maxlength")) {
    <ng-container>حداکثر کاراکتر مجاز {{ maxlength }} عدد</ng-container>

    }@else if (control?.hasError("pattern")) { @if(exactlength) {
    <ng-container>باید {{ exactlength }} رقمی باشد</ng-container>
    }@else if(isMobileNumber) {
      <ng-container>
      فرمت شماره درست نمیباشد
      </ng-container>
   
    } @else {
      <ng-container
      >رمز باید شامل حداقل یک حرف بزرگ ، یک کاراکتر خاص و یک عدد
      باشد</ng-container
    >

    }
   } }
    </p>
  `,
  styleUrl: './error-message.component.css',
})
export class ErrorMessageComponent  {
  @Input() control: AbstractControl | null = null;
  @Input() minlength: number = 0;
  @Input() maxlength: number = 0;
  @Input() exactlength: number = 0;
  @Input() isMobileNumber : boolean = false



}
