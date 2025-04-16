import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

@Component({
  selector: 'app-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;

  private _snackBar = inject(MatSnackBar);
  @ViewChild('rememberInput') rememberInput!: ElementRef;

  isLegal: boolean = false;

  constructor(private authService: AuthService , private router:Router) {}

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitLoginForm() {
    console.log(this.loginFormGroup.value);
    this.authService
      .loginPerson(this.loginFormGroup.value)
      .pipe(
        catchError((err) => {
          console.log(err);

          if (err.status === 400) {
            this._snackBar.open(err.message, 'تلاش دوباره', {
              verticalPosition: 'top',
            });
          } else {
            this._snackBar.open('خطای غیر منتظره ایی رخ داده', 'تلاش دوباره', {
              verticalPosition: 'top',
            });
          }
          return of(null);
        })
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res!.statusCode === 200) {
          const isRememberMeOn = this.rememberInput.nativeElement.checked;
          sessionStorage.setItem('token', res.data);
          console.log(
            'token in sessionStorage =>',
            sessionStorage.getItem('token')
          );
          if (isRememberMeOn) {
            localStorage.setItem('token', res.data);
            console.log(
              'token in localStorage =>',
              localStorage.getItem('token')
            );
          }
          this.router.navigate(["/users"])
        }
      });
  }
}
