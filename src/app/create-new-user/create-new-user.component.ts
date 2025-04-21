import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MaterialModule } from '../material.module';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormFeildComponent } from "../shared/form-feild/form-feild.component";
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { Router, RouterModule } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ActionButtonComponent } from "../shared/action-button/action-button.component";
import { BackButtonComponent } from "../shared/back-button/back-button.component";
import { InputFeildComponent } from "../shared/input-feild/input-feild.component";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-new-user',
  imports: [MaterialModule, ErrorMessageComponent, RouterModule, ActionButtonComponent, BackButtonComponent, InputFeildComponent],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css',
})
export class CreateNewUserComponent implements OnInit , OnDestroy{
  createNewUserFormGroup!: FormGroup;
  private _snackBar = inject(MatSnackBar);

constructor(private usersService : UsersService , private router : Router) {

}

  ngOnInit(): void {


    
    
    this.createNewUserFormGroup = new FormGroup({
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
      fatherName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
      ]),
      mobileNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^09\d{9}$/),
      ]),
      organizationId: new FormControl(1, []),
      nationalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?!(\d)\1{9})\d{10}$/),
      ]),
      identifyNumber: new FormControl('', []),
      isForeigner: new FormControl(false, []),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(12),
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
    });
  }

  editUserSub! : Subscription
  onSubmitCreateNewUserForm() {
    console.log(this.createNewUserFormGroup.value);
    const newUserInfos = {...this.createNewUserFormGroup.value }
    this.editUserSub = this.usersService.RegisterNewUser(newUserInfos).pipe(catchError((err : any) => {
      
      
      this._snackBar.open(err , "تلاش مجدد" , {
        duration : 2000
      })

      return of(null)
    })).subscribe((res) => {
      if(res !== null) {
        this.router.navigate(["/users"])

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
