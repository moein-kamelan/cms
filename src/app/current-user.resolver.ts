import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UsersService } from './services/users.service';

export const currentUserResolver: ResolveFn<any> = (route, state) => {
  const userService = inject(UsersService)
  return userService.GetCurrentUser()
};
