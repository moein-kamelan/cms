import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject, Output, EventEmitter } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitModalComponent } from '../../confirm-exit-modal/confirm-exit-modal.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule, SidebarComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',

})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  @ViewChild('openNavMenuButton') openNavMenuButton!: ElementRef;
@Output() openSidebar = new EventEmitter()
  currentUser: any = null;
  currentUserSub!: Subscription;
  dialogSub!: Subscription;

  constructor(private usersService: UsersService ) {}

  ngOnInit(): void {

    this.currentUserSub = this.usersService.GetCurrentUser().subscribe((user) => {
      if(user) {
      this.currentUser = user;

      }
      
    });
  }



  closeMobileMenu(mobileMenu: HTMLDivElement, overlay: HTMLDivElement) {
    mobileMenu.style.display = 'none';
    overlay.style.display = 'none';
  }

  openMobileMenu(mobileMenu: HTMLDivElement, overlay: HTMLDivElement) {
    mobileMenu.style.display = 'block';
    overlay.style.display = 'block';
  }



  openDialog() {
    const dialogRef = this.dialog.open(ConfirmExitModalComponent , {
      width : "380px",
    });
    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if(result) {


        
        
      }
    
    });
  }

  onOpenSidenav() {
    this.openSidebar.emit()
  }
  

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }
}
