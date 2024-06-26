import { createReducer, on } from '@ngrx/store';
import {
  addusersuccess,
  deleteUserSuccess,
  getusersuccess,
  loaduserFail,
  loaduserSuccess,
  lockUserSuccess,
  unlockuserSuccess,
  updateUserSuccess,
} from '../user/user.action';
import { userState } from './user.state';
import { MemberView } from '../../../core/model/admin/memberView';

const _userReducer = createReducer(
  userState,
  on(loaduserSuccess, (state, action) => {
    return {
      ...state,
      userlist: [...action.userlist],
      ErrorMessage: '',
    };
  }),
  on(loaduserFail, (state, action) => {
    return {
      ...state,
      userlist: [],
      ErrorMessage: action.ErrorText,
    };
  }),
  on(addusersuccess, (state, action) => {
    console.log("actionnffooorr"+JSON.stringify(action));
    
    const memberView: MemberView = {
      id: action.userinput.user.id || '', 
      userName: action.userinput.user.userName,
      firstName: action.userinput.user.firstName,
      lastName: action.userinput.user.lastName,
      dateCreated: new Date(), 
      isLocked: false, 
      roles: action.roles.split(',')
    };
    return {
      ...state,
      userlist: [...state.userlist, memberView],
      ErrorMessage:''
    };
  }),
  on(getusersuccess, (state, action) => ({
    ...state,
   userobj:action.obj,
   ErrorMessage:""
  })),

  on(deleteUserSuccess, (state,action) => {
    const updatedUser=state.userlist.filter((data:MemberView)=>{
      return data.id!==action.id
    })
    return {
      ...state,
      userlist:updatedUser,
      ErrorMessage:''
    };
  }),  
  on(updateUserSuccess, (state, action) => {
    const updatedUserList = state.userlist.map(user => {
      if (user.id === action.userInput.id) {
        return {
          ...user,
          firstName: action.userInput.firstName,
          lastName: action.userInput.lastName,
          roles: action.userInput.roles.split(',') // Split roles string into an array
        };
      }
      return user;
    });
    return {
      ...state,
      userlist: updatedUserList
    };
  }),
  on(lockUserSuccess, (state, { id }) => ({
    ...state,
    userlist: state.userlist.map(user =>
      user.id === id ? { ...user, isLocked: true } : user
    )
  })),
  on(unlockuserSuccess, (state, { id }) => ({
    ...state,
    userlist: state.userlist.map(user =>
      user.id === id ? { ...user, isLocked: false } : user
    )
  }))
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
