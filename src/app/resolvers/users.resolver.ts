import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { UsersService } from '../services/users.service';
import { delay } from 'rxjs';

export const usersResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const userService = inject(UsersService);
  const paginationInfos = {
    pageSize: 5,
    pageNumber: 1,
  };

  return userService.GetAllUsersWithPagination(paginationInfos)
  




};
