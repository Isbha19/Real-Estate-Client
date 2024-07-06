import { createReducer, on } from '@ngrx/store';

import { loadcompanyFail, loadcompanySuccess } from './company.action';
import { companyState } from './company.state';

const _companyReducer = createReducer(
    companyState,
  on(loadcompanySuccess, (state, action) => {
    return {
      ...state,
      companyList: [...action.companylist],
      ErrorMessage: '',
    };
  }),
  on(loadcompanyFail, (state, action) => {
    return {
      ...state,
      companyList: [],
      ErrorMessage: action.ErrorText,
    };
  }),

);

export function companyReducer(state: any, action: any) {
  return _companyReducer(state, action);
}
