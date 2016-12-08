import { User } from '../models/user';
import * as userAuth from '../actions/user-auth';
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  entities: {[id: string]: User};
  ids: string[];
  selectedUserId: string;
  access_token: string;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  entities: {},
  ids: [],
  selectedUserId: null,
  access_token: localStorage.getItem('access_token')
};

export function reducer(state = initialState, action: userAuth.Actions): State {
  switch(action.type) {
    case userAuth.ActionTypes.LOGIN_SUCCESS:
    case userAuth.ActionTypes.LOGOUT_SUCCESS:
    case userAuth.ActionTypes.CHECK_AUTH_SUCCESS: {
      return Object.assign({}, state, action.payload)
    }
    case userAuth.ActionTypes.FIND_USERS_SUCCESS: {
      const users = action.payload;
      const newUsers = users.filter(user => !state.entities[user.id])

      const newUserIds = newUsers.map(user => user.id);
      const newEntities = newUsers.reduce((entities: { [id: string]: User }, user: User) => {
        return Object.assign(entities, {
          [user.id]: user
        });
      }, {});

      return Object.assign({}, state, {
        ids: [ ...state.ids, ...newUserIds ],
        entities: Object.assign({}, state.entities, newEntities)
      })
    }
    default: {
      return state;
    }
  }
}


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedUserId;

export const getAuthStatus = (state: State) => state.isAuthenticated && state.access_token != null;

export const getUser = (state: State) => new User(state.user);

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});