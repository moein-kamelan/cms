import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-feild',
  imports: [MaterialModule , ReactiveFormsModule],
  templateUrl: './input-feild.component.html',
  styleUrl: './input-feild.component.css'
})
export class InputFeildComponent {
@Input() type! : string
@Input() placeholder! : string
@Input() control : FormControl = new FormControl()
@Input() minlength : number | null = null
@Input() maxlength : number | null = null
@Input() exactlength : number | null = null
@Input() formControl! : AbstractControl | null
@Input() isMobileNumber : boolean = false
@Input() label : string = ""



}
