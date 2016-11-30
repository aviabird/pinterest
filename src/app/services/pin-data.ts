import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPins from '../reducers/pins';
import { Pin } from '../models/pin';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPins.State>;

  constructor(
    public db: AngularFireDatabase
  ) {
  };

  getPins() {
    return this.db.list('pins')
      .map(pins => pins.map(pin => new Pin(pin)));
  }
}