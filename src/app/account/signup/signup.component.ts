import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { catchError, from, of, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorMessageComponent } from '../../shared/error-message/error-message.component';
@Component({
  selector: 'app-signup',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit , OnDestroy{
  private _snackBar = inject(MatSnackBar);

  legalFormGroup!: FormGroup;
  personalFormGroup!: FormGroup;

  isLegal: boolean = false;

  ngOnInit(): void {
    this.personalFormGroup = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      nationalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!(\d)\1{9})\d{10}$/),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
      ]),
      isForeigner: new FormControl(false, []),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
    });

    this.legalFormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      postalCode: new FormControl('', [
        Validators.required,

        Validators.pattern(/^\d{10}$/),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
      ]),
      nationalId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!([0-9])\1{10})\d{11}$/),
      ]),
      nationalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!(\d)\1{9})\d{10}$/),
      ]),
      economicCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{12}$/),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
    });
  }

  constructor(private authService: AuthService) {}

  onChangeTab(index: number) {
    if (index === 0) {
      this.isLegal = false;
      this.legalFormGroup.reset();
    } else if (index === 1) {
      this.isLegal = true;
      this.personalFormGroup.reset();
    }
  }

  onsubmit() {
    if (this.isLegal) {
      this.onlegalFormSubmit();
    } else {
      this.onPersonalSubmit();
    }
  }

  private createLegalPersonSub!: Subscription;
  onlegalFormSubmit() {
    console.log('this.legalFormGroup.value =>', this.legalFormGroup.value);
    this.createLegalPersonSub = this.authService
      .createLegalAccount(this.legalFormGroup.value)
      .pipe(
        catchError((err) => {
          console.log('err in catch err', err);

          if (err.status === 400) {
            this._snackBar.open(
              err.error.validationErrors[0].message,
              'تلاش دوباره',
              {
                verticalPosition: 'top',
              }
            );
          } else {
            this._snackBar.open('خطای غیر منتظره ایی رخ داده', 'تلاش دوباره', {
              verticalPosition: 'top',
            });
          }

          return of(null);
        })
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  private createPersonalSub!: Subscription;

  onPersonalSubmit() {
    console.log(
      'this.personalFormGroup.value =>',
      this.personalFormGroup.value
    );
   this.createPersonalSub = this.authService
      .createPersonalAccount(this.personalFormGroup.value)
      .pipe(
        catchError((err) => {
          if (err.status === 400) {
            this._snackBar.open(
              err.error.validationErrors[0].message,
              'تلاش دوباره',
              {
                verticalPosition: 'top',
              }
            );
          } else {
            this._snackBar.open('خطای غیر منتظره ایی رخ داده', 'تلاش دوباره', {
              verticalPosition: 'top',
            });
          }

          return of(null);
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
      });
  }

  
ngOnDestroy(): void {
    this.createLegalPersonSub?.unsubscribe()
    this.createPersonalSub?.unsubscribe()
}  
  
}
