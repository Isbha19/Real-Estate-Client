import { AdminCompanyService } from '../../../../components/Admin/services/adminCompany.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { LOAD_COMPANY, loadcompanyFail, loadcompanySuccess } from './company.action';

@Injectable()
export class CompanyEffects {
  action$ = inject(Actions);
  constructor(private service: AdminCompanyService, private toastr: ToastrService) {}
  _LoadCompany = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_COMPANY),
      exhaustMap((action) => {
        return this.service.getVerifiedCompanies().pipe(
          map((data) => {
            return loadcompanySuccess({ companylist: data });
          }),
          catchError((error) => of(loadcompanyFail({ ErrorText: error.message })))
        );
      })
    )
  );


}
