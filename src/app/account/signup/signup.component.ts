import {
  Component,
  ElementRef,
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
import { catchError, from, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ThemeButtonComponent } from "../../shared/theme-button/theme-button.component";
@Component({
  selector: 'app-signup',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, ThemeButtonComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
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
      nationalCode: new FormControl('', [Validators.required]),
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
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
      ]),
      nationalId: new FormControl('', [Validators.required]),
      nationalCode: new FormControl('', [Validators.required]),
      economicCode: new FormControl('', [Validators.required]),
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
      this.onlegalFormSubmit()
    } else {
      this.onPersonalSubmit()
    }
  }

  onlegalFormSubmit() {
    console.log('this.legalFormGroup.value =>', this.legalFormGroup.value);
    this.authService.createLegalAccount(this.legalFormGroup.value).pipe(catchError((err) => {
      console.log("err in catch err" , err);
      this._snackBar.open( "کاربری با این نام قبلا وجود داشته", "تلاش دوباره" , {
      });
      
      return of(null);
    })).subscribe({
      next: (res) => {
        console.log(res);

      },
      error : (err) => {
        console.log(err);
        
      }
    });;
  }

  onPersonalSubmit() {
    console.log(
      'this.personalFormGroup.value =>',
      this.personalFormGroup.value
    );
    this.authService.createPersonalAccount(this.personalFormGroup.value).pipe(catchError((err) => {
      console.log("err in catch err" , err.error.validationErrors[0].message);
      this._snackBar.open( "کاربری با این نام قبلا وجود داشته", "تلاش دوباره" , {
      });
      
      return of(null);
    })).subscribe({
      next: (res) => {
        console.log(res);
      },
      error : (err) => {
        console.log(err);
        
      }
    });;
  }
}
