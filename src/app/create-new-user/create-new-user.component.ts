import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MaterialModule } from '../material.module';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { Router, RouterModule } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { UsersService } from '../services/users.service';
import { ActionButtonComponent } from "../shared/action-button/action-button.component";
import { BackButtonComponent } from "../shared/back-button/back-button.component";
import { InputFeildComponent } from "../shared/input-feild/input-feild.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { nationalCodeValidator } from '../validators/national-code.validator';

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
        nationalCodeValidator()
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
    this.editUserSub = this.usersService.RegisterNewUser(newUserInfos).subscribe((res) => {
      if(res) {
        
        
        console.log("created User => " , res);
        this._snackBar.open("کاربر با موفقیت ایجاد شد" , undefined , {
          duration : 2000
        })

        setTimeout(() => {
        this.router.navigate(["/users"])
          
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
