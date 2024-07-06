import { createAction, props } from "@ngrx/store";
import { CompanyDetails } from "../../../../components/Admin/model/company/companyDetail";



export const LOAD_COMPANY_SUCCESS='[company page] laod company success'
export const LOAD_COMPANY_FAIL='[company page] laod company fail'
export const LOAD_COMPANY='[company page] load company '


export const loadcompany=createAction(LOAD_COMPANY);
export const loadcompanySuccess=createAction(LOAD_COMPANY_SUCCESS,props<{companylist:CompanyDetails[]}>());
export const loadcompanyFail=createAction(LOAD_COMPANY_FAIL,props<{ErrorText:string}>());
