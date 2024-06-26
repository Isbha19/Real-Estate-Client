import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { map } from 'rxjs';
import { User } from '../model/account/user';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
 
  return accountService.user$.pipe(
    map((user: any) => {      
      if (user) {
        const decodedToken: any = jwtDecode(user?.data.jwt);
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

