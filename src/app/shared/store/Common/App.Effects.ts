import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';

import { showalert } from './App.Action';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions, private toastr: ToastrService) {}

  showAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showalert),
      tap(action => {
        if (action.resultType === 'fail') {
          this.toastr.error(action.message);
        } else {
          this.toastr.success(action.message);
        }
      }),
      map(() => ({ type: 'EMPTY_ACTION' })) // Replace 'EMPTY_ACTION' with your empty action type
    )
  );

}
