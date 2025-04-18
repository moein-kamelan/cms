import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-details',
  imports: [HeaderComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
userID : string | null = null

constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  this.userID = this.route.snapshot.paramMap.get("id")  
  console.log('this.userID:', this.userID)

}

}
