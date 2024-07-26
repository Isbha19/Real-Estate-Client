import { createReducer, on } from '@ngrx/store';
import { packageState } from './package.state';
import { addpackagesuccess, deletepackageSuccess, getpackagesuccess, loadpackageFail, loadpackageSuccess } from './package.action';
import { Package } from '../../../components/Subscriptions/model/package';


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
  on(addpackagesuccess, (state, action) => {
    const _package={...action.packageinput}

    console.log('Action received in addpackagesuccess:', action); // Log the action contents
console.log(_package);

    return {
        ...state,
        packageList: [...state.packageList, _package], // Add the new package to the existing list
        ErrorMessage: ""
    };
}),
on(deletepackageSuccess, (state,action) => {
  const updatedList=state.packageList.filter((data:Package)=>{
    return data.id!==action.id
  })
  return {
    ...state,
    packageList:updatedList,
    ErrorMessage:''
  };
}), 


);

export function packageReducer(state: any, action: any) {
  return _packageReducer(state, action);
}
