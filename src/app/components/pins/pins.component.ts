import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pin } from '../../models/pin';
import { AuthenticationService } from '../../services/authentication';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as pin from '../../actions/pin';

@Component({
  selector: 'pin-items',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PinsComponent implements OnInit {
  pins: Observable<Pin[]>;

  constructor(
    private authService: AuthenticationService,
    private store: Store<fromRoot.AppState>
  ) {
    this.pins = this.store.select(fromRoot.getPins);
  }

  ngOnInit() {
    this.loadPins();
  }

  onScroll() {
    this.loadPins();
  }

  loadPins() {
    this
      .store
      .dispatch(new pin.GetPinsAction());
  }

  createRange(len= 20) {
    let arr = [];
    for (let i = 0; i < len ; i++) {
      arr.push(i);
    }
    return arr;
  }

}
