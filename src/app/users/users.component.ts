import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../material.module';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [MaterialModule, HeaderComponent , RouterOutlet],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class Users implements OnInit{
  mainUser : any
  constructor( private route : ActivatedRoute) {

  }

  ngOnInit(): void {
    const resolveData = this.route.snapshot.data["userData"]

    if(resolveData) {
      this.mainUser = resolveData.data
    }
  }
}
