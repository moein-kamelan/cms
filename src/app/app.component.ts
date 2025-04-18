import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeButtonComponent } from "./shared/theme-button/theme-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'cms';

  constructor(private renderer : Renderer2) {

  }

  ngOnInit(): void {
      const themeStatus = localStorage.getItem("theme") || "light"

      if(themeStatus === "light") {
      this.renderer.removeClass(document.body , "dark")    
      } else {
        this.renderer.addClass(document.body , "dark")
      }
      
      
  }
  
  
}
