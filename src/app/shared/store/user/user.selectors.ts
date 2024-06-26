import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { users } from "./user.model";

const getUserState=createFeatureSelector<users>('user'); //registered name inside the bracket

export const getUserList=createSelector(getUserState,(state)=>{    
   return state.userlist;

})
export const getUser=createSelector(getUserState,(state)=>{    
   return state.userobj;

})

