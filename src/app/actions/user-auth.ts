import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/user';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  LOGIN:                    type('[User-Auth] Login'),
  LOGIN_SUCCESS:            type('[User-Auth] Login Success'),
  LOGOUT:                   type('[User-Auth] Logout'),
  LOGOUT_SUCCESS:           type('[User-Auth] Logout Success'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class LoginAction implements Action {
  type = ActionTypes.LOGIN;

  constructor(public payload: string) { };
}

export class LoginSuccessAction implements Action {
  type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) { };
}

export class LogoutAction implements Action {
  type = ActionTypes.LOGOUT;
  
  constructor() {};
}

export class LogoutSuccessAction implements Action {
  type = ActionTypes.LOGOUT_SUCCESS;
  
  constructor(payload: any) {};
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = LoginAction
  | LoginSuccessAction
  | LogoutAction
  | LogoutSuccessAction
