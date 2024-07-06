import { companies } from './company.model';
import {  createFeatureSelector, createSelector } from "@ngrx/store";

const getCompanyState=createFeatureSelector<companies>('company'); //registered name inside the bracket

export const getCompanyList=createSelector(getCompanyState,(state)=>{    
   return state.companyList;

})
export const getCompany=createSelector(getCompanyState,(state)=>{    
   return state.companyobj;

})

