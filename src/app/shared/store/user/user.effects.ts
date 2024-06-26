import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { AdminService } from '../../../core/service/admin.service';
import {
  LOAD_USER,
  ADD_USER,
  addusersuccess,
  loaduserFail,
  loaduserSuccess,
  updateUser,
  updateUserSuccess,
  deleteUser,
  deleteUserSuccess,
  lockuser,
  lockUserSuccess,
  unlockuser,
  unlockuserSuccess,
  getuser,
  getusersuccess,
} from '../user/user.action';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { AddEditMemberComponent } from '../../../components/Admin/add-edit-member/add-edit-member.component';
import { showalert } from '../Common/App.Action';

@Injectable()
export class UserEffects {
  action$ = inject(Actions);
  constructor(private service: AdminService, private toastr: ToastrService) {}
  _Loaduser = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_USER),
      exhaustMap((action) => {
        return this.service.getMembers().pipe(
          map((data) => {
            return loaduserSuccess({ userlist: data });
          }),
          catchError((error) => of(loaduserFail({ ErrorText: error.message })))
        );
      })
    )
  );
  _AddUser = createEffect(() =>
    this.action$.pipe(
      ofType(ADD_USER),
      switchMap((action) => {
        return this.service.addEditMember(action.userinput).pipe(
          
          switchMap((data: any) => {  
            console.log(JSON.stringify(action.userinput)+"debuf");
          
            return of(
              addusersuccess({
                userinput: data,roles:action.userinput.roles
              }),
              showalert({ message: data.message, resultType: 'pass' })
            );
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
  _getUser = createEffect(() =>
    this.action$.pipe(
      ofType(getuser),
      switchMap((action) => {
        return this.service.getMember(action.id).pipe(
          switchMap((data: any) => {
            return of(
              getusersuccess({
                obj: data,
              })            );
          }),
          catchError((error) => {
            console.log(JSON.stringify(error)+"getuser");

            const errorMessage = error.error?.message || 'An error occurred';
            return of(showalert({ message: errorMessage, resultType: 'fail' })); // Dispatch an action to handle the error
          })
        );
      })
    )
  );
  _deleteUser = createEffect(() =>
    this.action$.pipe(
      ofType(deleteUser),
      exhaustMap((action) => {
        return this.service.deleteMember(action.id).pipe(
          map((data) => {
          
            return deleteUserSuccess({ id: action.id });
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

  _updateUser = createEffect(() =>
    this.action$.pipe(
      ofType(updateUser),
      switchMap((action) => {
        return this.service.addEditMember(action.userInput).pipe(
          switchMap((data: any) => {
            return of(
              updateUserSuccess({
                userInput: action.userInput,
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
  lockUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(lockuser),
      switchMap((action) => {
        return this.service.lockMember(action.id).pipe(
          map(() => 
            lockUserSuccess({ id: action.id })),
          catchError((error) => {
            const errorMessage = error.error?.message || 'Failed to lock user';
            return of(showalert({ message: errorMessage, resultType: 'fail' }));
          })
        );
      })
    )
  );

  unlockUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(unlockuser),
      switchMap((action) => {
        return this.service.unlockMember(action.id).pipe(
          map(() => unlockuserSuccess({ id: action.id })),
          catchError((error) => {
            const errorMessage = error.error?.message || 'Failed to unlock user';
            return of(showalert({ message: errorMessage, resultType: 'fail' }));
          })
        );
      })
    )
  );
}
