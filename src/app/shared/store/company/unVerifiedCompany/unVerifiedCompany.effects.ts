import { AdminCompanyService } from '../../../../components/Admin/services/adminCompany.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { LOAD_UNVERIFIEDCOMPANY, loadunverifiedcompanyFail, loadunverifiedcompanySuccess } from './unVerifiedCompany.action';


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
  _verifyCompany = createEffect(() =>
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


}
