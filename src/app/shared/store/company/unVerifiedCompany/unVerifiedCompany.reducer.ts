import { createReducer, on } from '@ngrx/store';

import { unverifiedcompanyState } from './unVerifiedCompany.state';
import { loadunverifiedcompanyFail, loadunverifiedcompanySuccess } from './unVerifiedCompany.action';

const _unverifiedcompanyReducer = createReducer(
    unverifiedcompanyState,
  on(loadunverifiedcompanySuccess, (state, action) => {
    return {
      ...state,
      unVerifiedcompanyList: [...action.companylist],
      ErrorMessage: '',
    };
  }),
  on(loadunverifiedcompanyFail, (state, action) => {
    return {
      ...state,
      unVerifiedcompanyList: [],
      ErrorMessage: action.ErrorText,
    };
  }),

);

export function unverifiedcompanyReducer(state: any, action: any) {
  return _unverifiedcompanyReducer(state, action);
}
