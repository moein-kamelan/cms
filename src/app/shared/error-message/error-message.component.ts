import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-error-message',
  imports: [MaterialModule],
  template: `

@if (  control?.invalid && (control?.touched || control?.dirty) ) {
                      @if
                      (control?.hasError('required'))
                      {
                      <ng-container>مقداری وارد نشده</ng-container>
                      } @else if
                      (control?.hasError("minlength"))
                      {
                      <ng-container>حداقل کاراکتر مجاز {{minlength}} عدد</ng-container>

                      }@else if
                      (control?.hasError("maxlength"))
                      {
                      <ng-container>حداکثر کاراکتر مجاز {{maxlength}} عدد</ng-container>

                      }@else if
                      (control?.hasError("pattern")) {
                        @if(exactlength) {
                          <ng-container>باید {{exactlength}} رقمی باشد</ng-container>
                        }@else {
                          <ng-container
                        >رمز باید شامل حداقل یک حرف بزرگ ، یک کاراکتر خاص و یک
                        عدد باشد</ng-container
                      >
                        }
           

                      }
                    }
  `,
  styleUrl: './error-message.component.scss'
})
export class ErrorMessageComponent implements OnInit{
@Input() control : AbstractControl | null = null
@Input() minlength : number = 0
@Input() maxlength : number = 0
@Input() exactlength : number = 0

ngOnInit(): void {
  console.log(this.control);
  
  console.log(this.minlength);
  console.log(this.maxlength);
  
}


}
