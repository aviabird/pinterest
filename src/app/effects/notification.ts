import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { Action, Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import * as notification from '../actions/notification';
import { Toastr } from '../models/toastr';

@Injectable()
export class NotificationEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>
  ) {}

  @Effect() showProgress$: Observable<Action> = this.actions$
    .ofType(notification.ActionTypes.SHOW_PROGRESS)
    .map(() => new notification.ShowProgressSuccessAction())
  
  @Effect() completeProgress$: Observable<Action> = this.actions$
    .ofType(notification.ActionTypes.COMPLETE_PROGRESS)
    .map(() => new notification.CompleteProgressSuccessAction())

  @Effect() showNotification$: Observable<Action> = this.actions$
    .ofType(notification.ActionTypes.POP_NOTIFICATION)
    .map(action => action.payload)
    .map((toastr: Toastr) => new notification.PopNotificationSuccessAction(toastr))

}