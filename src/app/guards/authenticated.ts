import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getUserAuthStatus } from '../reducers/index';

@Injectable()
export class CanActivateViaAuthGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate() {
    return this.store.select(getUserAuthStatus);
  }
}
