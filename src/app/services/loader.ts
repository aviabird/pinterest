import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/index';
import * as notification from '../actions/notification'
import { PopNotificationAction } from '../actions/notification';
import { Toastr } from '../models/toastr';

@Injectable()
export class LoaderService {
  constructor(private store: Store<AppState>) {}
  
  showPreloader(){
    this.store.dispatch(new notification.ShowProgressAction());
  }

  hidePreloader(){
    this.store.dispatch(new notification.CompleteProgressAction());
  }

  popError() {
    this.store.dispatch(new PopNotificationAction(new Toastr({
      type: 'error', tilte: 'Ouchh !!', body: 'Something Went Wrong'
    })))
  }

  popMessage() {
    this.store.dispatch(new PopNotificationAction(new Toastr({
      type: 'info', tilte: 'Wait a Second ..', body: 'Loading in Progress ..'
    })))
  }
}