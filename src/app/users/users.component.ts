import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { GetCurrentUserService } from '../services/get-current-user.service';

@Component({
  selector: 'app-users',
  imports: [MaterialModule, HeaderComponent , RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class Users implements OnInit , OnChanges{
  mainUser : any
  resolveData : any
  constructor( private route : ActivatedRoute , private getCurrentUserService : GetCurrentUserService) {

  }

  ngOnInit(): void {
    console.log('this.getCurrentUserService.currentUser:', this.getCurrentUserService.currentUser)
    this.resolveData = this.getCurrentUserService.currentUser || this.route.snapshot.data["userData"]
    console.log('resolveData:', this.resolveData)

    if(this.resolveData) {
      this.mainUser = this.resolveData.data
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.mainUser = this.resolveData.data
  }
}
