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
  GET_SELECTED_PIN:             type('[Pins] Get Selected Pin'),
  GET_SELECTED_PIN_SUCCESS:     type('[Pins] Get Selected Pin Success'),
  GET_USER_PINS:                type('[Pins] Get User Pins'),
  GET_USER_PINS_SUCESS:         type('[Pins] Get User Pins Sucess'),
  SELECT_PIN:                   type('[Pins] Select Pin'),
  ADD_PIN:                      type('[Pins] Add Pin'),
  ADD_PIN_SUCCESS:              type('[Pins] Add Pin Success'),
  SAVE_PIN:                     type('[Pins] Save Pin'),
  SAVE_PIN_SUCCESS:             type('[Pins] Save Pin Success'),
  DELETE_PIN:                   type('[Pins] Delete Pin'),
  DELETE_PIN_SUCCESS:           type('[Pins] Delete Pin Success'),
  SEARCH_PIN:                   type('[Pins] Add Search Tag')
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

  constructor(public payload?: string) { };
}

export class GetPinsSuccessAction implements Action {
  type = ActionTypes.GET_PINS_SUCESS;

  constructor(public payload: Pin[]){};
}

export class GetSelectedPinAction implements Action {
  type = ActionTypes.GET_SELECTED_PIN;

  constructor(public payload: string) { };
}

export class GetSelectedPinSuccessAction implements Action {
  type = ActionTypes.GET_SELECTED_PIN_SUCCESS;

  constructor(public payload: Pin){};
}

export class SelectPinAction implements Action {
  type = ActionTypes.SELECT_PIN;

  constructor(public payload: string){};
}

export class AddPinAction implements Action {
  type = ActionTypes.ADD_PIN;

  constructor(public payload: Pin) { };
}

export class AddPinSuccessAction implements Action {
  type = ActionTypes.ADD_PIN_SUCCESS;

  constructor(public payload: Pin) { };
}

export class SavePinAction implements Action {
  type = ActionTypes.SAVE_PIN;

  constructor(public payload: Pin) { };
}

export class SavePinSuccessAction implements Action {
  type = ActionTypes.SAVE_PIN_SUCCESS;

  constructor(public payload: Pin) { };
}

export class DeletePinAction implements Action {
  type = ActionTypes.DELETE_PIN

  constructor(public payload: Pin){};
}

export class DeletePinSuccessAction implements Action {
  type = ActionTypes.DELETE_PIN_SUCCESS

  constructor(public payload: string){};
}

export class SearchPinAction implements Action {
  type = ActionTypes.SEARCH_PIN

  constructor(public payload: string){};
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = GetPinsAction
  | GetSelectedPinAction
  | GetSelectedPinSuccessAction
  | GetPinsSuccessAction
  | SelectPinAction
  | AddPinAction
  | AddPinSuccessAction
  | SavePinAction
  | SavePinSuccessAction
  | DeletePinAction
  | DeletePinSuccessAction
  | SearchPinAction