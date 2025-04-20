import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-action-button',
  imports: [MaterialModule],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.css'
})
export class ActionButtonComponent {
  @Input() formValidation!: boolean 
  @Input() iconText : string = ''
  @Input() buttonText : string = ""
}
