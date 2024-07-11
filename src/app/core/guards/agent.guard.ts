import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodedToken } from '../model/jwtTokenDecoded';

export const agentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
 
  return accountService.user$.pipe(
    map((user) => {      
      if (user) {
        const decodedToken: JwtDecodedToken = jwtDecode(user?.jwt);
        
        if (decodedToken.role.includes('Agent')) {
          return true;
        }
      }
      
     toastrService.error('Access Denied: Only authorized agents are allowed to list properties. If you are an agent, please log in with your credentials to access this feature.');
      router.navigateByUrl('/');
      return false;
    
    })
  );
}

