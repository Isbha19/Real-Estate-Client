import { AdminCompanyService } from '../../../../components/Admin/services/adminCompany.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { LOAD_UNVERIFIEDCOMPANY, loadunverifiedcompanyFail, loadunverifiedcompanySuccess, verifyCompany, verifyCompanySuccess } from './unVerifiedCompany.action';
import { showalert } from '../../Common/App.Action';


@Injectable()
export class unVerifiedCompanyEffects {
  action$ = inject(Actions);
  constructor(private service: AdminCompanyService, private toastr: ToastrService) {}
  _LoadUnVerifiedCompany = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_UNVERIFIEDCOMPANY),
      exhaustMap((action) => {
        return this.service.getUnVerifiedCompanies().pipe(
          map((data) => {
            return loadunverifiedcompanySuccess({ companylist: data });
          }),
          catchError((error) => of(loadunverifiedcompanyFail({ ErrorText: error.message })))
        );
      })
    )
  );

  verifyCompany = createEffect(() =>
    this.action$.pipe(
      ofType(verifyCompany),
      switchMap((action) => {
        return this.service.verifyCompany(action.companyId).pipe(
          switchMap((data: any) => {
            return of(
              verifyCompanySuccess({
                companyId: action.companyId,
              }),
              showalert({ message: data.message, resultType: 'pass' })
            );
          }),
          catchError((error) => {
            const errorMessage = error.error?.message || 'An error occurred';
            return of(showalert({ message: errorMessage, resultType: 'fail' })); // Dispatch an action to handle the error
          })
        );
      })
    )
  );

}
