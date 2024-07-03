import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../service/account.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/account/user';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const toastrService = inject(ToastrService);


  return accountService.user$.pipe(
    map((user:User|null) => {
      if (user) {
        return true;
      }

      toastrService.error('You must be logged in to access this page. Please log in and try again.');
      
      return false;
    })
  );
}
