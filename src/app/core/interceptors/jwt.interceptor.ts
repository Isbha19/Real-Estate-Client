import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../service/account.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService=inject(AccountService);
  console.log("interceptor called");
  
  accountService.user$.pipe(take(1)).subscribe({
    next:user=>{
      if(user){        
        req=req.clone({
          setHeaders:{
            Authorization:`Bearer ${user.data.jwt}`
            
          }
        })
      }
    }
  })
  
  return next(req);
};
