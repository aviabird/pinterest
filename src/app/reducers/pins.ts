import { User } from '../models/user';
import * as pin from '../actions/pin';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { createSelector } from 'reselect';
import { ActionTypes } from '../actions/user-auth';
import { Pin } from '../models/pin';

export interface State {
  ids: string[];
  entities: { [id: string]: Pin };
  selectedPinId: string;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedPinId: null
};

export function reducer(state = initialState, action: pin.Actions): State {
  switch(action.type) {
    case pin.ActionTypes.GET_PINS_SUCESS: {
      const pins = action.payload;
      const newPins = pins.filter(pin => !state.entities[pin.$key])

      const newPinIds = newPins.map(pin => pin.$key);
      const newPinEntities = newPins.reduce((entities: { [id: string]: Pin }, pin: Pin) => {
        return Object.assign(entities, {
          [pin.$key]: pin
        });
      }, {});
      
      return Object.assign({}, state, {
        ids: [ ...state.ids, ...newPinIds ],
        entities: newPinEntities,
        selectedPinId: state.selectedPinId
      })
    }
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */


export const getEntities = (state: State) => state.entities;

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedPinId;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});
