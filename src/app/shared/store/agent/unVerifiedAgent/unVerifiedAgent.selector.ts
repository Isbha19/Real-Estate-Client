import {  createFeatureSelector, createSelector } from "@ngrx/store";
import { unverifiedagents } from "./unVerifiedAgent.model";

const getunVerifiedAgentState=createFeatureSelector<unverifiedagents>('unverifiedagents'); //registered name inside the bracket

export const getUnVerifiedAgentList=createSelector(getunVerifiedAgentState,(state)=>{    
   return state.unVerifiedagentList;

})
export const getUnVerifiedAgent=createSelector(getunVerifiedAgentState,(state)=>{    
   return state.unVerifiedagentobj;

})

