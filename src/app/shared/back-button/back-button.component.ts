import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-back-button',
  imports: [MaterialModule , RouterModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.css'
})
export class BackButtonComponent  {

  log() {
    
  }

}
