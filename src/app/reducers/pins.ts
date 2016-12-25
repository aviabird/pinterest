import { User } from '../models/user';
import * as pin from '../actions/pin';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { createSelector } from 'reselect';
import { Pin } from '../models/pin';

export interface State {
  ids: string[];
  entities: { [id: string]: Pin };
  selectedPinId: string;
  search_tags: string;
}

const initialState: State = {
  ids: [],
  entities: {},
  selectedPinId: null,
  search_tags: null
};

export function reducer(state = initialState, action: pin.Actions): State {
  switch(action.type) {
    case pin.ActionTypes.GET_PINS_SUCESS: {
      const pins = <Pin[]>action.payload;
      const newPins = pins.filter(pin => !state.entities[pin.id])

      const newPinIds = newPins.map(pin => pin.id);
      const newEntities = newPins.reduce((entities: { [id: string]: Pin }, pin: Pin) => {
        return Object.assign(entities, {
          [pin.id]: pin
        });
      }, {});
      
      return Object.assign({}, state, {
        ids: [ ...state.ids, ...newPinIds ],
        entities: Object.assign({}, state.entities, newEntities)
      })
    }
    case pin.ActionTypes.SELECT_PIN: {
      return Object.assign({}, state, {
        selectedPinId: action.payload
      });
    }
    case pin.ActionTypes.GET_SELECTED_PIN_SUCCESS: {
      const pin = <Pin>action.payload;

      if(state.entities[pin.id]) { return state }

      return Object.assign({}, state, {
        ids: [ ...state.ids, pin.id],
        entities: Object.assign({}, state.entities, {
          [pin.id]: pin
        })
      })
    }
    case pin.ActionTypes.DELETE_PIN_SUCCESS: {
      const id = action.payload;
      const newIds = state.ids.filter(val => val != id)

      const newEntities = newIds.reduce((entities: { [id: string]: Pin }, id: string) => {
        return Object.assign(entities, {
          [id]: state.entities[id]
        });
      }, {});

      return Object.assign({}, state, {
        entities: newEntities,
        ids: newIds
      })
    }

    case pin.ActionTypes.ADD_PIN_SUCCESS: {
      let newPin = <Pin>action.payload;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities,
                                {[newPin.id]: newPin}
                               ),
        ids: [ ...state.ids, newPin.id ]
      })
    }

    case pin.ActionTypes.SAVE_PIN_SUCCESS: {
      let updatedPin = <Pin>action.payload;

      return Object.assign({}, state, {
        entities: Object.assign({}, state.entities,
                                {[updatedPin.id]: updatedPin}
                               )
      })
    }

    case pin.ActionTypes.SEARCH_PIN: {
      return Object.assign({}, state, {
        search_tags: action.payload,
        ids: [],
        entities: {}
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

export const getSearchTags = (state: State) => state.search_tags;

export const getSelected = createSelector(getEntities, getSelectedId, (entities, selectedId) => {
  return entities[selectedId];
});
