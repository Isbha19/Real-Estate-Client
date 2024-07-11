import { createReducer, on } from '@ngrx/store';

import { unverifiedagentState } from './unVerifiedAgent.state';
import { loadunverifiedagentFail, loadunverifiedagentSuccess, verifyagentSuccess } from './unVerifiedAgent.action';

const _unverifiedagentReducer = createReducer(
    unverifiedagentState,
  on(loadunverifiedagentSuccess, (state, action) => {
    return {
      ...state,
      unVerifiedagentList: [...action.agentlist],
      ErrorMessage: '',
    };
  }),
  on(loadunverifiedagentFail, (state, action) => {
    return {
      ...state,
      unVerifiedagentList: [],
      ErrorMessage: action.ErrorText,
    };
  }),
  on(verifyagentSuccess, (state, { agentId }) => ({
    ...state,
    unVerifiedagentList: state.unVerifiedagentList.filter(agent => agent.agentId !== agentId), 
  })),

);

export function unverifiedagentReducer(state: any, action: any) {
  return _unverifiedagentReducer(state, action);
}
