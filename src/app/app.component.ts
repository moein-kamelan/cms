import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeButtonComponent } from "./shared/theme-button/theme-button.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'cms';
}
