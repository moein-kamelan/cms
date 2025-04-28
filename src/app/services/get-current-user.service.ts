import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserService {
  currentUser: any;
  token = localStorage.getItem("token") || sessionStorage.getItem("token");

  constructor(private userService: UsersService) {}

  getCurrentUser(): Promise<void> {
    if (this.token) {
      return firstValueFrom(this.userService.GetCurrentUser()).then((res: any) => {
        this.currentUser = res;
      }).catch((error) => {
        console.error('Error getting current user', error);
      });
    } else {
      return Promise.resolve(); 
    }
  }
}
