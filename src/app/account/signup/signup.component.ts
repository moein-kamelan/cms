import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
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
import { InputFeildComponent } from '../../shared/input-feild/input-feild.component';
import { nationalCodeValidator } from '../../validators/national-code.validator';
import { passwordsMatchValidator } from '../../validators/password-mathc.validator';
@Component({
  selector: 'app-signup',
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    InputFeildComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit, OnDestroy {
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
        nationalCodeValidator(),
        Validators.maxLength(12)
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
        Validators.maxLength(11)
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
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
       
      ]),
    },
    {validators : passwordsMatchValidator() }
    );

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
        Validators.maxLength(10)
        
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
        Validators.maxLength(11)
      ]),
      nationalId: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!([0-9])\1{10})\d{11}$/),
        Validators.maxLength(11)
      ]),
      nationalCode: new FormControl('', [
        Validators.required,
        nationalCodeValidator(),
        Validators.maxLength(10)


      ]),
      economicCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{12}$/),
        Validators.maxLength(12)

      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
  
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
    },
    {validators : passwordsMatchValidator() }

    );

    this.personalFormGroup
      .get('nationalCode')
      ?.valueChanges.subscribe((value) => {});
  }

  constructor(private authService: AuthService, private router: Router) {}

  getPersonalFormControl(contolName: string) {
    return this.personalFormGroup.get(contolName) as FormControl;
  }
  getLegalFormControl(contolName: string) {
    return this.legalFormGroup.get(contolName) as FormControl;
  }

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
    delete this.legalFormGroup.value.confirmPassword
    this.createLegalPersonSub = this.authService
      .createLegalAccount(this.legalFormGroup.value).subscribe((res) => {
        if(res) {
          console.log(res);
          this.router.navigate(['/account/login']);
        }
        
      });
  }

  private createPersonalSub!: Subscription;

  onPersonalSubmit() {
    delete this.personalFormGroup.value.confirmPassword
    this.createPersonalSub = this.authService.createPersonalAccount(this.personalFormGroup.value).subscribe((res) => {
        if(res) {
          this._snackBar.open("کاربر با موفقیت ایجاد شد" , undefined , {
            duration : 2000
          })
          setTimeout(() => {
            this.router.navigate(['/account/login']);

          }, 2000);
        }
      });
  }

  ngOnDestroy(): void {
    this.createLegalPersonSub?.unsubscribe();
    this.createPersonalSub?.unsubscribe();
  }
}
