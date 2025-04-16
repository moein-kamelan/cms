import { Component, ElementRef, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-header',
  imports: [MaterialModule , RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
closeMobileMenu(el : any) {
  console.log("el => " , el);
  
  el.nativeElement.style.display = "none"
}
currentUser : any = null
  constructor(private usersService : UsersService) {
    
  }

  ngOnInit(): void {
    this.usersService.fetchCurrentUser().subscribe((user) => {
      this.currentUser = user;
      console.log('this.currentUser:', this.currentUser)
      
    })

  }
  
logout() {
  localStorage.clear()
  sessionStorage.clear()
}



}
