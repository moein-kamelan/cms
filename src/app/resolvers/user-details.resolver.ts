import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UsersService } from '../services/users.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';

export const userDetailsResolver: ResolveFn<any> = (route : ActivatedRouteSnapshot) => {
  const userService = inject(UsersService)
  const id = route.paramMap.get("id")

  console.log("it's resolver response");
  
  
  
  return userService.GetUserById(id).pipe(catchError((err : any) => {
    console.error('خطا در گرفتن اطلاعات کاربر:', err);
    return of(null)
  }))
  
  
};
