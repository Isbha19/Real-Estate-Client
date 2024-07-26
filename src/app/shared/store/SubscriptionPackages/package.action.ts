import { createAction, props } from "@ngrx/store";
import { Package } from "../../../components/Subscriptions/model/package";



export const LOAD_PACKAGE_SUCCESS='[package page] laod package success'
export const LOAD_PACKAGE_FAIL='[package page] laod package fail'
export const LOAD_PACKAGE='[package page] load package '
export const GET_PACKAGE='[package page] get package '
export const GET_PACKAGE_SUCCESS='[package page] get package success'

export const loadpackage=createAction(LOAD_PACKAGE);
export const loadpackageSuccess=createAction(LOAD_PACKAGE_SUCCESS,props<{packagelist:Package[]}>());
export const loadpackageFail=createAction(LOAD_PACKAGE_FAIL,props<{ErrorText:string}>());


export const getpackage=createAction(GET_PACKAGE,props<{id:string}>())
export const getpackagesuccess=createAction(GET_PACKAGE_SUCCESS,props<{obj:Package}>())