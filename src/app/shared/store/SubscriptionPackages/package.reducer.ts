import { createReducer, on } from '@ngrx/store';
import { packageState } from './package.state';
import { getpackagesuccess, loadpackageFail, loadpackageSuccess } from './package.action';


const _packageReducer = createReducer(
    packageState,
  on(loadpackageSuccess, (state, action) => {
    return {
      ...state,
      packageList: [...action.packagelist],
      ErrorMessage: '',
    };
  }),
  on(loadpackageFail, (state, action) => {
    return {
      ...state,
      packageList: [],
      ErrorMessage: action.ErrorText,
    };
  }),
  on(getpackagesuccess, (state, action) => ({
    ...state,
   packageObj:action.obj,
   ErrorMessage:""
  })),


);

export function packageReducer(state: any, action: any) {
  return _packageReducer(state, action);
}
