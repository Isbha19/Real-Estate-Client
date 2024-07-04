import { HttpInterceptorFn } from '@angular/common/http';
import { AccountService } from '../service/account.service';
import { inject } from '@angular/core';
import { take } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService=inject(AccountService);

  accountService.user$.pipe(take(1)).subscribe({
    next:user=>{
      if(user){        
        req=req.clone({
          setHeaders:{
            Authorization:`Bearer ${user.jwt}`
            
          }
        })
      }
    }
  })

  return next(req);
};
