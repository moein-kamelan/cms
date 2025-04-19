import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { MaterialModule } from '../material.module';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { FormFeildComponent } from "../shared/form-feild/form-feild.component";
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-new-user',
  imports: [ MaterialModule, ErrorMessageComponent , RouterModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.css',
})
export class CreateNewUserComponent implements OnInit {
  createNewUserFormGroup!: FormGroup;


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
      organizationId: new FormControl(0, []),
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

  onSubmitCreateNewUserForm() {
    console.log(this.createNewUserFormGroup.value);
    

    
  }
  
  onclickSubmitButton() {
    console.log(this.createNewUserFormGroup.valid);
    
  }


  
}
