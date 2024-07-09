import { AdminCompanyService } from '../../../../components/Admin/services/adminCompany.service';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { LOAD_UNVERIFIEDAGENT, loadunverifiedagentFail, loadunverifiedagentSuccess, verifyagent, verifyagentSuccess } from './unVerifiedAgent.action';
import { CompanyDashboardService } from '../../../../components/Company/service/company-dashboard.service';
import { showalert } from '../../Common/App.Action';


@Injectable()
export class unVerifiedAgentEffects {
  action$ = inject(Actions);
  constructor(private service: CompanyDashboardService, private toastr: ToastrService) {}
  _LoadUnVerifiedAgent = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_UNVERIFIEDAGENT),
      exhaustMap((action) => {
        return this.service.getUnVerifiedAgents().pipe(
          map((data) => {
            return loadunverifiedagentSuccess({ agentlist: data });
          }),
          catchError((error) => of(loadunverifiedagentFail({ ErrorText: error.message })))
        );
      })
    )
  );
  verifyAgent = createEffect(() =>
    this.action$.pipe(
      ofType(verifyagent),
      switchMap((action) => {
        return this.service.verifyAgent(action.agentId).pipe(
          switchMap((data: any) => {
            return of(
              verifyagentSuccess({
                agentId: action.agentId,
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
