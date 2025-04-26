import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UsersService } from '../services/users.service';

export const editUserResolver: ResolveFn<any> = (route : ActivatedRouteSnapshot) => {
  const userID = route.paramMap.get("id")
  const userService = inject(UsersService)
  return userService.GetUserById(userID)



  
  
};
