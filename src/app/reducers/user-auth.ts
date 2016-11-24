import { User } from '../models/user';
import * as userAuth from '../actions/user-auth';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from '../actions/user-auth';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null
};

export function reducer(state = initialState, action: userAuth.Actions): State {
  switch(action.type) {
    case userAuth.ActionTypes.LOGIN_SUCCESS:
    case userAuth.ActionTypes.LOGOUT_SUCCESS:
    case userAuth.ActionTypes.CHECK_AUTH_SUCCESS: {
      return Object.assign({}, state, action.payload)
    }
    default: {
      return state;
    }
  }
}

export function getAuthStatus(state$: Observable<State>) {
  return state$.select(state => state.isAuthenticated);
}

export function getUser(state$: Observable<State>) {
  return state$.select(state => state.user);
}