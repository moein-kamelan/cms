import { ChangeDetectorRef, Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, Event } from '@angular/router';
import { ThemeButtonComponent } from "./shared/theme-button/theme-button.component";
import { HeaderComponent } from "./shared/header/header.component";
import { MaterialModule } from './material.module';
import { UsersService } from './services/users.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// Assertion function برای اطمینان از نوع NavigationEnd
function isNavigationEnd(event: Event): event is NavigationEnd {
  return event instanceof NavigationEnd;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeButtonComponent, HeaderComponent , MaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'cms';
  mainUser : any = null
  private unsubscribe$ = new Subject<void>();
  private hiddenRoutes = ["/account/login" , "/account/signup"];

  constructor(private renderer : Renderer2 , public router:Router , private userService : UsersService , private cdRef : ChangeDetectorRef) {

  }

  ngOnInit(): void {
      const themeStatus = localStorage.getItem("theme") || "light"

      if(themeStatus === "light") {
      this.renderer.removeClass(document.body , "dark")
      } else {
        this.renderer.addClass(document.body , "dark")
      }

      this.router.events.pipe(
        filter(isNavigationEnd), // استفاده از assertion function به جای inline function
        filter((event: NavigationEnd) => !this.hiddenRoutes.includes(event.url)),
        takeUntil(this.unsubscribe$)
      ).subscribe(() => {
        this.userService.GetCurrentUser().pipe(takeUntil(this.unsubscribe$)).subscribe((res : any) => {
          this.mainUser = res.data
          console.log('this.mainUser:', this.mainUser)
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  shouldShowHeader() {
    return !this.hiddenRoutes.includes(this.router.url)
  }

}