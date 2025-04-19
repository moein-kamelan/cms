import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isLoggedIn = !!localStorage.getItem("token") || !!sessionStorage.getItem("token")
  if (!isLoggedIn) {
    
    router.navigate(["account/login"])
    return false
    
  }
  
  return true;
  
};
