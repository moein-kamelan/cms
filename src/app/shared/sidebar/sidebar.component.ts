import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UsersService } from '../../services/users.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-sidebar',
  imports: [MaterialModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  mainUser: any = null
  @ViewChild("sidebar") sidebar! : MatDrawer
  constructor(private usersServie : UsersService){

  }

  ngOnInit(): void {
    this.usersServie.GetCurrentUser().subscribe((res : any) => {
      this.mainUser = res.data
      console.log('this.mainUser:', this.mainUser)
      
    })
  }

  
  
}
