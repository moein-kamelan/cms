import {
  Component,
  ElementRef,
  OnDestroy,
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
import { catchError, from, of, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { InputFeildComponent } from "../../shared/input-feild/input-feild.component";

@Component({
  selector: 'app-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, InputFeildComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit , OnDestroy {
  loginFormGroup!: FormGroup;

  private _snackBar = inject(MatSnackBar);
  @ViewChild('rememberInput') rememberInput!: ElementRef;

  isLegal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}
  private isLoginSub !: Subscription 
  ngOnInit(): void {
    this.loginFormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitLoginForm() {
    this.isLoginSub = this.authService
      .loginPerson(this.loginFormGroup.value)
      .pipe(
        catchError((err) => {
          console.log(err);

          if (err.status) {
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
        if(res) {
          this._snackBar.open('ورود موفقیت آمیز بود / در حال انتقال به صفحه اصلی' , undefined, {
            verticalPosition: 'top',
            duration : 2000
          });
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

          setTimeout(() => {
          this.router.navigate(['/users']);
            
          }, 2000);
        }
     
          
      });
  }

  getLoginFormControl(controlName : string) {
    return this.loginFormGroup.get(controlName) as FormControl
  }

  ngOnDestroy(): void {

    this.isLoginSub?.unsubscribe()
      
  }

  
  
}
