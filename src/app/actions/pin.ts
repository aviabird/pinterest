import { Action } from '@ngrx/store';
import { type } from '../util';
import { User } from '../models/user';
import { Pin } from '../models/pin';
import { Observable } from 'rxjs/Observable';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 * 
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique. 
 */
export const ActionTypes = {
  GET_PINS:                     type('[Pins] Get Pins'),
  GET_PINS_SUCESS:              type('[Pins] Get Pins Success'),
  GET_USER_PINS:                type('[Pins] Get User Pins'),
  GET_USER_PINS_SUCESS:         type('[Pins] Get User Pins Sucess'),
  SELECT_PIN:                   type('[Pins] Select Pin'),
};


/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful 
 * type checking in reducer functions.
 * 
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GetPinsAction implements Action {
  type = ActionTypes.GET_PINS;

  constructor() { };
}

export class GetPinsSuccessAction implements Action {
  type = ActionTypes.GET_PINS_SUCESS;

  constructor(public payload: Pin[]){};
}

export class SelectPinAction implements Action {
  type = ActionTypes.SELECT_PIN;

  constructor(public payload: string){};
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPinsAction
  | GetPinsSuccessAction
  | SelectPinAction