import { createAction, props } from "@ngrx/store";
import { MemberAddEdit } from './../../../components/Admin/model/memberAddEdit';
import { MemberView } from "../../../components/Admin/model/memberView";


export const LOAD_USER_SUCCESS='[user page] laod user success'
export const LOAD_USER_FAIL='[user page] laod user fail'
export const LOAD_USER='[user page] load user '
export const ADD_USER_SUCCESS='[user page] add user success'
export const ADD_USER='[user page] add user '
export const DELETE_USER='[user page] delete user '
export const DELETE_USER_SUCCESS='[user page] delete user success'
export const UPDATE_USER='[user page] update user '
export const UPDATE_USER_SUCCESS='[user page] update user success'
export const LOCK_USER='[user page] lock user '
export const LOCK_USER_SUCCESS='[user page] lock user success'
export const UNLOCK_USER='[user page] unlock user '
export const UNLOCK_USER_SUCCESS='[user page] unlock user success'
export const GET_USER='[user page] get user '
export const GET_USER_SUCCESS='[user page] get user success'


export const loaduser=createAction(LOAD_USER);
export const loaduserSuccess=createAction(LOAD_USER_SUCCESS,props<{userlist:MemberView[]}>());
export const loaduserFail=createAction(LOAD_USER_FAIL,props<{ErrorText:string}>());
export const adduser=createAction(ADD_USER,props<{userinput:MemberAddEdit}>())
export const addusersuccess=createAction(ADD_USER_SUCCESS,  props<{ userinput: { success: boolean; message: string; user: MemberAddEdit }; roles: string }>()
);
export const getuser=createAction(GET_USER,props<{id:string}>())
export const getusersuccess=createAction(GET_USER_SUCCESS,props<{obj:MemberAddEdit}>())

export const deleteUser=createAction(DELETE_USER,props<{id:string}>())

export const deleteUserSuccess=createAction(DELETE_USER_SUCCESS,props<{id:string}>())
export const updateUser=createAction(UPDATE_USER,props<{userInput:MemberAddEdit}>())

export const updateUserSuccess=createAction(UPDATE_USER_SUCCESS,props<{userInput:MemberAddEdit}>())

export const lockuser=createAction(LOCK_USER,props<{id:string}>());
export const lockUserSuccess=createAction(LOCK_USER_SUCCESS,props<{id: string}>());
export const unlockuser=createAction(UNLOCK_USER,props<{id:string}>());
export const unlockuserSuccess=createAction(UNLOCK_USER,props<{id: string}>());