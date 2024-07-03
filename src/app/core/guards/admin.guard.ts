import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodedToken } from '../model/jwtTokenDecoded';
import { User } from '../model/account/user';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
 
  return accountService.user$.pipe(
    map((user:User |null) => {      
      if (user) {
        console.log(JSON.stringify(user));
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        console.log(JSON.stringify(decodedToken.role)+"decoded");
        
        if (decodedToken.role.includes('Admin')) {
          return true;
        }
      }
      
     toastrService.error('You are not authorized to access admin resources');
      router.navigateByUrl('/');
      return false;
    
    })
  );
}

