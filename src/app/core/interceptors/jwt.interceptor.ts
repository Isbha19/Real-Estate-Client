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
        console.log("yes userrr");
         
        req=req.clone({
          setHeaders:{
            Authorization:`Bearer ${user.jwt}`
          }
        })
      }else{
        console.log("no userr");

      }
      
      }
  })
  console.log(JSON.stringify(req)+" request details");

  return next(req);
};
