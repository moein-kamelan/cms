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
  themeStatus = localStorage.getItem("theme") || "light"

  constructor(private renderer : Renderer2) {

  }
  
changeTheme() {



if(this.themeStatus === "light") {
  console.log("hello");
  
  this.renderer.addClass(document.body , "dark")
  this.themeStatus = "dark"
  localStorage.setItem("theme" , "dark")
  
} else {
  this.renderer.removeClass(document.body , "dark")
  this.themeStatus = "light"
  localStorage.setItem("theme" , "light")
  

}



}




}
