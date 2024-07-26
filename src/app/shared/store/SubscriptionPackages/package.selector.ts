import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { Packages } from "./package.model";

const getPackageState=createFeatureSelector<Packages>('package'); //registered name inside the bracket

export const getPackageList=createSelector(getPackageState,(state)=>{    
   return state.packageList;

})
export const getPackage=createSelector(getPackageState,(state)=>{    
   return state.packageObj;

})

