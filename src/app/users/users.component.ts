import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { UsersService } from '../services/users.service';
import { PaginationComponent } from "../shared/pagination/pagination.component";
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: 'app-users',
  imports: [HeaderComponent, PaginationComponent, SearchbarComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  users:any = []
  paginationInfos : { pageNumber : number , pageSize : number} = { pageNumber : 1 , pageSize : 5 }
  constructor(private usersService : UsersService) {

  }


  ngOnInit(): void {
    this.usersService.fetchAllUsers( this.paginationInfos).subscribe((res : any) => {
      this.users = res.data.items
      console.log('this.users:', this.users)
    })
  }
  

}
