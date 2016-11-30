import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromPin from '../reducers/pin';
import { Pin } from '../models/pin';

@Injectable()
export class PinDataService {
  PinState: Observable<fromPin.State>;

  constructor(
    public db: AngularFireDatabase
  ) {
  };

  getPins() {
    return this.db.list('pins').map<Pin[]>(pins => pins);
  }
}