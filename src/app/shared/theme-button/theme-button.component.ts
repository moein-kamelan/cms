import { Component, ElementRef, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-theme-button',
  imports: [MaterialModule],
  templateUrl: './theme-button.component.html',
  styleUrl: './theme-button.component.css',
  encapsulation : ViewEncapsulation.None
})
export class ThemeButtonComponent {
  isDark:boolean = false

  constructor(private renderer : Renderer2) {

  }
  
changeTheme() {
this.isDark = !this.isDark

console.log(this.isDark);


if(this.isDark) {
  this.renderer.addClass(document.body , "dark")
  
} else {
  this.renderer.removeClass(document.body , "dark")
  

}



}




}
