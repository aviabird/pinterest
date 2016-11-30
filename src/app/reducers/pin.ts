import { User } from '../models/user';
import * as pin from '../actions/pin';
import { Observable } from 'rxjs/Observable';
import { ActionTypes } from '../actions/user-auth';
import { Pin } from '../models/pin';

export interface State {
  pins: Pin[];
}

const initialState: State = {
  pins: []
};

export function reducer(state = initialState, action: pin.Actions): State {
  switch(action.type) {
    case pin.ActionTypes.GET_PINS_SUCESS: {
      return Object.assign({}, state, {
        pins: action.payload
      })
    }
    default: {
      return state;
    }
  }
}

export function getPins(state$: Observable<State>) {
  return state$.select(state => state.pins);
}