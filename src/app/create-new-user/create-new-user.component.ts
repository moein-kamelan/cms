import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MaterialModule } from '../material.module';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { Router, RouterModule } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ActionButtonComponent } from "../shared/action-button/action-button.component";
import { BackButtonComponent } from "../shared/back-button/back-button.component";
import { InputFeildComponent } from "../shared/input-feild/input-feild.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { nationalCodeValidator } from '../validators/national-code.validator';
import { passwordsMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-create-new-user',
  imports: [MaterialModule, ErrorMessageComponent, RouterModule, ActionButtonComponent, BackButtonComponent, InputFeildComponent],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css',
})
export class CreateNewUserComponent implements OnInit , OnDestroy{
  createNewUserFormGroup!: FormGroup;
  private _snackBar = inject(MatSnackBar);

constructor(private usersService : UsersService , private router : Router , private fb : FormBuilder) {

}

ngOnInit(): void {
  this.createNewUserFormGroup = this.fb.group(
    {
      firstName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      fatherName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      userName: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]],
      mobileNumber: ['', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
        Validators.maxLength(11),
      ]],
      organizationId: [1, []],
      nationalCode: ['', [
        Validators.required,
        nationalCodeValidator(),
        Validators.maxLength(10),
      ]],
      identifyNumber: ['', []],
      isForeigner: [false, []],
      password: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.maxLength(12),
      ]],
    },
    {validators : passwordsMatchValidator() }
  
  );
}



  editUserSub! : Subscription
  onSubmitCreateNewUserForm() {
    delete this.createNewUserFormGroup.value.confirmPassword
    const newUserInfos = {...this.createNewUserFormGroup.value }
    this.editUserSub = this.usersService.RegisterNewUser(newUserInfos).subscribe((res) => {
      if(res) {
        
        
        this._snackBar.open("کاربر با موفقیت ایجاد شد" , undefined , {
          duration : 2000
        })

        setTimeout(() => {
        this.router.navigate(["/users/info"])
          
        }, 2000);

      }
      
    })

    
  }

  getCreateNewUserFormControl(controlName : string) {
    return this.createNewUserFormGroup.get(controlName) as FormControl;
  }

  
ngOnDestroy(): void {
  this.editUserSub?.unsubscribe()
}
  
}
