import {  inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { map } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

export const agentGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);
 
  return accountService.user$.pipe(
    map((user: any) => {      
      if (user) {
        console.log(JSON.stringify(user));
        const decodedToken: any = jwtDecode(user?.data.jwt);
        console.log(decodedToken+"decoded");
        
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

