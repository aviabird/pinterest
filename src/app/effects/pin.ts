import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as pin from '../actions/pin';
import * as userAuth from '../actions/user-auth';
import { AppState, getPinscountWithSeatchQuery } from '../reducers/index';
import { LoginSuccessAction, LogoutAction, FindUsersSuccessAction } from '../actions/user-auth';
import { PinDataService } from '../services/pin-data';
import { Pin } from '../models/pin';

@Injectable()
export class PinEffects {
  constructor(
    private actions$: Actions,
    private pinDataService: PinDataService,
    private store: Store<AppState>
  ) {}

  @Effect() getPins$: Observable<Action> = this.actions$
    .ofType(pin.ActionTypes.GET_PINS)
    .map(action => action.payload)
    .debounceTime(400)
    .switchMap(() =>this.pinDataService.getPins())
    .map((pins: Pin[]) => {
      let users = pins.map(pin => pin.user)
      this.store.dispatch(new userAuth.FindUsersSuccessAction(users))
      return pins
    })
    .map(pins => new pin.GetPinsSuccessAction(pins))
  
  @Effect() getPin$: Observable<Action> = this.actions$
    .ofType(pin.ActionTypes.GET_SELECTED_PIN)
    .map(action => action.payload)
    .switchMap((id) => this.pinDataService.getPin(id))
    .map((pin: Pin) => {
      let users = [pin.user]
      this.store.dispatch(new userAuth.FindUsersSuccessAction(users))
      return pin
    })
    .map(_pin => new pin.GetSelectedPinSuccessAction(_pin))

  @Effect() addPin$: Observable<Action> = this.actions$
    .ofType(pin.ActionTypes.ADD_PIN)
    .map(action => action.payload)
    .switchMap((_pin: Pin) => this.pinDataService.addPin(_pin))
    .map((_pin) => new pin.AddPinSuccessAction(_pin))
  
  @Effect() savePin$: Observable<Action> = this.actions$
    .ofType(pin.ActionTypes.SAVE_PIN)
    .map(action => action.payload)
    .switchMap((_pin: Pin) => this.pinDataService.savePin(_pin))
    .map((_pin) => new pin.SavePinSuccessAction(_pin))

  @Effect() deletePin$: Observable<Action> = this.actions$
    .ofType(pin.ActionTypes.DELETE_PIN)
    .map(action => action.payload)
    .switchMap((id: string) => this.pinDataService.deletePin(id))
    .map((id) => new pin.DeletePinSuccessAction(id))

}