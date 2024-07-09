import { createAction, props } from "@ngrx/store";
import { AgentDetails } from "../../../../components/Company/model/agentDetails";



export const LOAD_UNVERIFIEDAGENT_SUCCESS='[agent page] load unverified agent success'
export const LOAD_UNVERIFIEDAGENT_FAIL='[agent page] load unverified agent fail'
export const LOAD_UNVERIFIEDAGENT='[agent page] load unverified agent '


export const loadunverifiedagent=createAction(LOAD_UNVERIFIEDAGENT);
export const loadunverifiedagentSuccess=createAction(LOAD_UNVERIFIEDAGENT_SUCCESS,props<{agentlist:AgentDetails[]}>());
export const loadunverifiedagentFail=createAction(LOAD_UNVERIFIEDAGENT_FAIL,props<{ErrorText:string}>());

export const VERIFY_AGENT = '[agent] Verify agent';
export const VERIFY_AGENT_SUCCESS = '[agent] Verify agent Success';

export const verifyagent = createAction(VERIFY_AGENT, props<{ agentId: number }>());
export const verifyagentSuccess = createAction(VERIFY_AGENT_SUCCESS, props<{ agentId: number }>());
