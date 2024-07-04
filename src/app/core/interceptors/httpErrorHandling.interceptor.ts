import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP request started');
  const toastr = inject(ToastrService);


  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
        let errorMessage="";
      if(error?.status==0){
        toastr.error("server temporarily unavailable");

      }else{
        errorMessage = error.error?.message || 'An error occurred';
        toastr.error(errorMessage);
      }
      return throwError(() => new Error(errorMessage));

    })
  );
};