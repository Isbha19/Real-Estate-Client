import { createAction, props } from "@ngrx/store";
import { Package } from "../../../components/Subscriptions/model/package";



export const LOAD_PACKAGE_SUCCESS='[package page] laod package success'
export const LOAD_PACKAGE_FAIL='[package page] laod package fail'
export const LOAD_PACKAGE='[package page] load package '
export const GET_PACKAGE='[package page] get package '
export const GET_PACKAGE_SUCCESS='[package page] get package success'
export const ADD_PACKAGE_SUCCESS='[package page] add package success'
export const ADD_PACKAGE='[package page] add package '
export const DELETE_PACKAGE='[package page] delete package '
export const DELETE_PACKAGE_SUCCESS='[package page] delete package success'


export const loadpackage=createAction(LOAD_PACKAGE);
export const loadpackageSuccess=createAction(LOAD_PACKAGE_SUCCESS,props<{packagelist:Package[]}>());
export const loadpackageFail=createAction(LOAD_PACKAGE_FAIL,props<{ErrorText:string}>());


export const getpackage=createAction(GET_PACKAGE,props<{id:string}>())
export const getpackagesuccess=createAction(GET_PACKAGE_SUCCESS,props<{obj:Package}>())
export const addpackage=createAction(ADD_PACKAGE,props<{packageinput:Package}>())
export const addpackagesuccess=createAction(ADD_PACKAGE_SUCCESS,  props<{ packageinput: Package }>())
export const deletepackage=createAction(DELETE_PACKAGE,props<{id:string}>())

export const deletepackageSuccess=createAction(DELETE_PACKAGE_SUCCESS,props<{id:string}>())
