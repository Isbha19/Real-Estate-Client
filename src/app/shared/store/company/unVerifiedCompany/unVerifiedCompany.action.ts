import { createAction, props } from "@ngrx/store";
import { CompanyDetails } from "../../../../components/Admin/model/company/companyDetail";



export const LOAD_UNVERIFIEDCOMPANY_SUCCESS='[company page] load unverified company success'
export const LOAD_UNVERIFIEDCOMPANY_FAIL='[company page] load unverified company fail'
export const LOAD_UNVERIFIEDCOMPANY='[company page] load unverified company '


export const loadunverifiedcompany=createAction(LOAD_UNVERIFIEDCOMPANY);
export const loadunverifiedcompanySuccess=createAction(LOAD_UNVERIFIEDCOMPANY_SUCCESS,props<{companylist:CompanyDetails[]}>());
export const loadunverifiedcompanyFail=createAction(LOAD_UNVERIFIEDCOMPANY_FAIL,props<{ErrorText:string}>());

export const VERIFY_COMPANY = '[Company] Verify Company';
export const VERIFY_COMPANY_SUCCESS = '[Company] Verify Company Success';

export const verifyCompany = createAction(VERIFY_COMPANY, props<{ companyId: number }>());
export const verifyCompanySuccess = createAction(VERIFY_COMPANY_SUCCESS, props<{ companyId: number }>());
