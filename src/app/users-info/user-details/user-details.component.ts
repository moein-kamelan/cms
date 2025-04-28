import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BackButtonComponent } from "../../shared/back-button/back-button.component";
@Component({
  selector: 'app-user-details',
  imports: [BackButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
userID : string | null = null
mainUser : any = null
private _snackBar = inject(MatSnackBar);

constructor(private route: ActivatedRoute , private userService : UsersService) {}

ngOnInit(): void {


  const result = this.route.snapshot.data['userData']

  if(!result) {
    this._snackBar.open("تلاش دوباره" , "خطا در دریافت اطلاعات کاربر" , {
      verticalPosition : 'top'
    })
  } else {
    this.mainUser = result.data
  }

}

}
