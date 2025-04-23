import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, of } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const __snackBar = inject(MatSnackBar)
  return next(req).pipe(catchError((err : any) => {
    console.log("hello");
    
    __snackBar.open(err.message || "خطایی رخ داده" , "متوجه شدم" , {
      verticalPosition : "top"
    })
    
    return of(null as unknown as HttpEvent<unknown>);
  }))
  
};
