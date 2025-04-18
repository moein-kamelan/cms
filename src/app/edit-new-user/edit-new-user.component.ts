import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-new-user',
  imports: [HeaderComponent],
  templateUrl: './edit-new-user.component.html',
  styleUrl: './edit-new-user.component.css'
})
export class EditNewUserComponent implements OnInit {

  userID : string | null = null
  constructor(private route : ActivatedRoute) {
    
  }

  ngOnInit(): void {
      this.userID = this.route.snapshot.paramMap.get("id")
      console.log('this.userID:', this.userID)

  }

  
  

}
