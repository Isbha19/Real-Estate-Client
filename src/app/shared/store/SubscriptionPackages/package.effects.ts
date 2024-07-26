import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import {
  addpackage,
  addpackagesuccess,
  deletepackage,
  deletepackageSuccess,
  getpackage,
  getpackagesuccess,
  LOAD_PACKAGE,
  loadpackageFail,
  loadpackageSuccess,
} from './package.action';
import { SubscriptionPackageService } from '../../../components/Subscriptions/services/subscriptionPackage.service';
import { showalert } from '../Common/App.Action';

@Injectable()
export class PackageEffects {
  action$ = inject(Actions);
  constructor(
    private service: SubscriptionPackageService,
    private toastr: ToastrService
  ) {}
  _LoadPackage = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_PACKAGE),
      exhaustMap((action) => {
        return this.service.getPackages().pipe(
          map((data) => {
            return loadpackageSuccess({ packagelist: data });
          }),
          catchError((error) =>
            of(loadpackageFail({ ErrorText: error.message }))
          )
        );
      })
    )
  );
  _getUser = createEffect(() =>
    this.action$.pipe(
      ofType(getpackage),
      switchMap((action) => {
        return this.service.getPackageById(action.id).pipe(
          switchMap((data: any) => {
            return of(
              getpackagesuccess({
                obj: data,
              })
            );
          }),
          catchError((error) => {
            console.log(JSON.stringify(error) + 'getuser');

            const errorMessage = error.error?.message || 'An error occurred';
            return of(showalert({ message: errorMessage, resultType: 'fail' })); // Dispatch an action to handle the error
          })
        );
      })
    )
  );
  _addPackage = createEffect(() =>
    this.action$.pipe(
      ofType(addpackage),
      switchMap((action) => {
        return this.service.createPackage(action.packageinput).pipe(
          switchMap((data: any) => {
            console.log("data"+JSON.stringify(data)+"form ");
            
            return of(
              addpackagesuccess({
                packageinput: data,
              })
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
  _deletePackage = createEffect(() =>
    this.action$.pipe(
      ofType(deletepackage),
      exhaustMap((action) => {
        return this.service.deletePackage(action.id).pipe(
          map((data) => {
            return deletepackageSuccess({ id: action.id });
          }),
          catchError((error) => {
            console.log(error);
            
            const errorMessage = error.error?.message || 'An error occurred';
            return of(showalert({ message: errorMessage, resultType: 'fail' })); // Dispatch an action to handle the error
          })
        );
      })
    )
  );
}
