import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-edit-new-user',
  imports: [HeaderComponent, ErrorMessageComponent , MaterialModule],
  templateUrl: './edit-new-user.component.html',
  styleUrl: './edit-new-user.component.css'
})
export class EditNewUserComponent implements OnInit {

  userID : string | null = null
  editUserFormGroup! : FormGroup
  constructor(private route : ActivatedRoute) {
    
  }

  ngOnInit(): void {
      this.userID = this.route.snapshot.paramMap.get("id")
      console.log('this.userID:', this.userID)
      this.editUserFormGroup = new FormGroup({
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
        
      });

  }

  onclickSubmitButton() {

  }

  onSubmitEditUserForm() {

  }

  
  

}
