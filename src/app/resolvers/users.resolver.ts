import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UsersService } from '../services/users.service';

export const usersResolver: ResolveFn<any> = (route : ActivatedRouteSnapshot) => {
  const userService = inject(UsersService)
  const paginationInfo = userService.paginationSub.getValue()
  console.log('paginationInfo:', paginationInfo)
  return userService.GetAllUsersWithPagination(paginationInfo)


  
};
