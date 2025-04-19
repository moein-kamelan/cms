import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeButtonComponent } from "./shared/theme-button/theme-button.component";
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeButtonComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'cms';

  constructor(private renderer : Renderer2 , public router:Router) {

  }

  ngOnInit(): void {
      const themeStatus = localStorage.getItem("theme") || "light"

      if(themeStatus === "light") {
      this.renderer.removeClass(document.body , "dark")    
      } else {
        this.renderer.addClass(document.body , "dark")
      }
      
      
  }
  
  shouldShowHeader() {
    const hiddenRoutes = ["/account/login" , "/account/signup"]
    return !hiddenRoutes.includes(this.router.url)

  }
  
}
