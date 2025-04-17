import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit , OnDestroy {
  @ViewChild('openNavMenuButton') openNavMenuButton!: ElementRef;

  closeMobileMenu(mobileMenu : HTMLDivElement , overlay : HTMLDivElement) {

    mobileMenu.style.display = 'none';
    overlay.style.display = "none"
  }

  openMobileMenu(mobileMenu : HTMLDivElement , overlay : HTMLDivElement) { 
    mobileMenu.style.display = "block"
    overlay.style.display = "block"

  }
  
  
  
  currentUser: any = null;
  constructor(private usersService: UsersService) {}

  currentUserSub! : Subscription

  ngOnInit(): void {
    this.currentUserSub = this.usersService.GetCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('this.currentUser:', this.currentUser);
    });
  }

  logout() {
    localStorage.clear();
    sessionStorage.clear();
  }

ngOnDestroy(): void {
    this.currentUser?.unsubscribe()
}  
  
}
