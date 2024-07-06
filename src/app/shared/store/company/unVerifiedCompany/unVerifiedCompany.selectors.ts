import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { unverifiedcompanies } from "./unVerifiedCompany.model";

const getunVerifiedCompanyState=createFeatureSelector<unverifiedcompanies>('unverifiedcompanies'); //registered name inside the bracket

export const getUnVerifiedCompanyList=createSelector(getunVerifiedCompanyState,(state)=>{    
   return state.unVerifiedcompanyList;

})
export const getUnVerifiedCompany=createSelector(getunVerifiedCompanyState,(state)=>{    
   return state.unVerifiedcompanyobj;

})

