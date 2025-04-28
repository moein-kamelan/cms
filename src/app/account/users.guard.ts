import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const usersGuard: CanActivateFn = (route, state) => {
const islogin = !!localStorage.getItem("token") || !!sessionStorage.getItem("token");
const router = inject(Router)
  if(islogin) {


    router.navigate(["/users/info"])
    return false

  }
  
  
  return true;
};
