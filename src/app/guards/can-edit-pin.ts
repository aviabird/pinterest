import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, getPinAccessStatus } from '../reducers/index';

@Injectable()
export class CanEditPinGuard implements CanActivate {

  constructor(private store: Store<AppState>) {}

  canActivate() {
    return this.store.select(getPinAccessStatus);
  }
}
