import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmExitModalComponent } from '../../confirm-exit-modal/confirm-exit-modal.component';

@Component({
  selector: 'app-header',
  imports: [MaterialModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  @ViewChild('openNavMenuButton') openNavMenuButton!: ElementRef;

  currentUser: any = null;
  currentUserSub!: Subscription;
  dialogSub!: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.currentUserSub = this.usersService.GetCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('this.currentUser:', this.currentUser);
    });
  }

  openConfirmDialog() {
   
  }

  closeMobileMenu(mobileMenu: HTMLDivElement, overlay: HTMLDivElement) {
    mobileMenu.style.display = 'none';
    overlay.style.display = 'none';
  }

  openMobileMenu(mobileMenu: HTMLDivElement, overlay: HTMLDivElement) {
    mobileMenu.style.display = 'block';
    overlay.style.display = 'block';
  }

  logout() {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmExitModalComponent);
    this.dialogSub = dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result:', result);
        this.usersService.DeleteUserById(result).subscribe((res) => {
          console.log(res);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.currentUserSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }
}
