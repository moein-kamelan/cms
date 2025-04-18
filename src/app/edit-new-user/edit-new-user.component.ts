import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ErrorMessageComponent } from "../shared/error-message/error-message.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-new-user',
  imports: [HeaderComponent, ErrorMessageComponent , MaterialModule , RouterModule],
  templateUrl: './edit-new-user.component.html',
  styleUrl: './edit-new-user.component.css'
})
export class EditNewUserComponent implements OnInit {
mainUser : any = {};
  userID : string | null = null
  editUserFormGroup! : FormGroup
  constructor(private route : ActivatedRoute , private usersService : UsersService) {
    
  }

  
  
  

  ngOnInit(): void {
      this.userID = this.route.snapshot.paramMap.get("id")
    this.usersService.GetUserById(this.userID).subscribe((user : any) => {
      this.mainUser = user.data
      console.log('this.mainUser:', this.mainUser)

            this.editUserFormGroup = new FormGroup({
        firstName: new FormControl(this.mainUser.firstName, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        lastName: new FormControl(this.mainUser.lastName, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        fatherName: new FormControl( this.mainUser.fatherName , [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        userName: new FormControl( this.mainUser.userName , [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ]),
        mobileNumber: new FormControl( this.mainUser.mobileNumber , [
          Validators.required,
          Validators.pattern(/^09\d{9}$/),
        ]),
        organizationId: new FormControl(0, []),
        nationalCode: new FormControl( this.mainUser.nationalCode , [
          Validators.required,
          Validators.pattern(/^(?!(\d)\1{9})\d{10}$/),
        ]),
        identifyNumber: new FormControl('', []),
        isForeigner: new FormControl( this.mainUser.isForeigner, []),
        
      });
      
    })

    
      console.log('this.userID:', this.userID)


  }

  onclickSubmitButton() {

  }

  onSubmitEditUserForm() {

  }

  
  

}
