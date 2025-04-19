import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { catchError, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {
userID : string | null = null
mainUser : any = null
private _snackBar = inject(MatSnackBar);

constructor(private route: ActivatedRoute , private userService : UsersService) {}

ngOnInit(): void {
  this.userID = this.route.snapshot.paramMap.get("id")  
  this.userService.GetUserById(this.userID).pipe(catchError((err : any) => {
    this._snackBar.open(err.message , 'تلاش دوباره', {
      verticalPosition: 'top',
    });

    return of(null)
  })).subscribe((res : any) => {
    this.mainUser = res!.data
    
  })

}

}
