import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { from } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [RouterModule , MaterialModule , FormsModule, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginFormGroup!:FormGroup

isLegal:boolean = false
  
  constructor() { }

  ngOnInit(): void {
    this.loginFormGroup = new FormGroup(
      {
        "userName" : new FormControl('', [Validators.required , Validators.minLength(4) , Validators.maxLength(12)]),
        "password" : new FormControl("" , [Validators.required , Validators.minLength(4) , Validators.maxLength(12) , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{3,}$/)] )
      }
    )
  }

  

onChangeTab(index: number) {

  if(index === 0) {
    this.isLegal = false
  } else if(index === 1) { 
    this.isLegal = true
    
  }
    
}


onsubmit() {

}

  

}
