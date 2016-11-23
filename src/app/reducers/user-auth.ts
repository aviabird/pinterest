import { User } from '../models/user';
import * as userAuth from '../actions/user-auth';

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
    case userAuth.ActionTypes.LOGIN_SUCCESS: {
      console.log(action.payload)
      return state;
    }
  }
}