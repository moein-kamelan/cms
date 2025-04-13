import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [RouterModule , MaterialModule , FormsModule, ReactiveFormsModule ] ,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  encapsulation : ViewEncapsulation.None
})
export class SignupComponent {
  @ViewChild("legalFormButton") legalFormButton! : ElementRef<HTMLButtonElement> 
  @ViewChild("personalFormButton") personalFormButton! : ElementRef<HTMLButtonElement>

isLegal:boolean = false
  
  constructor() { }

personalFormgroup = new FormGroup({
  "firstName" : new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(12) ]  ),
  "lastName" : new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(12)]),
  "nationalCode" : new FormControl("" , [Validators.required , ]),
  "mobileNumber" : new FormControl("" , [Validators.required , Validators.pattern(/^09\d{9}$/)]),
  "isForeigner" : new FormControl("" , []),
  "userName" : new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(12)]),
  "password" : new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(12) , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{3,}$/)]),
})




legalFormGroup = new FormGroup(
  {
    "name" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "address" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "postalCode" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "mobileNumber" : new FormControl("" , [Validators.required , Validators.pattern(/^09\d{9}$/)]),
    "nationalId" : new FormControl("" , [Validators.required]),
    "nationalCode" : new FormControl("" , [Validators.required]),
    "economicCode" : new FormControl("" , [Validators.required]),
    "password" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "userName" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "firstName" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
    "lastName" : new FormControl("" , [Validators.required ,  Validators.minLength(4) , Validators.maxLength(12)]),
  }
)

onChangeTab(index: number) {

  if(index === 0) {
    this.isLegal = false
  } else if(index === 1) { 
    this.isLegal = true
    
  }
  

  
  
}


onsubmit() {
if(this.isLegal) {
  this.legalFormButton.nativeElement.click()
} else {
  this.personalFormButton.nativeElement.click()
}
}

onlegalFormSubmit() {
  console.log("hello");
  
  

  
  }

  onPersonalSubmit() {
    console.log("hello");
    
    
    }
    
    

}
