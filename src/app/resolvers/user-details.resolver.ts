import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';
import { catchError, delay, of } from 'rxjs';

export const userDetailsResolver: ResolveFn<any> = (route : ActivatedRouteSnapshot) => {
  const userService = inject(UsersService)
  const id = route.paramMap.get("id")

  
  
  
    return userService.GetUserById(id).pipe(delay(2500))
  
  
  
};
