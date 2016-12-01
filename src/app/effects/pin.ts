import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import * as pin from '../actions/pin';
import * as userAuth from '../actions/user-auth';
import { AppState } from '../reducers/index';
import { LoginSuccessAction, LogoutAction } from '../actions/user-auth';
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
    .switchMap(() => this.pinDataService.getPins())
    .map((pins: Pin[]) => {
      let userIds = pins.map(pin => pin.userId)
      this.store.dispatch(new userAuth.FindUsersAction(userIds))
      return pins
    })
    .map((pins) => new pin.GetPinsSuccessAction(pins))

}