import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Pin } from '../../../models/pin';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs/Observable';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-item',
  templateUrl: './pin-item.component.html',
  styleUrls: ['./pin-item.component.css'],
  inputs: ['pin'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinItemComponent implements OnInit {
  pin : Pin;
  user: Observable<User>;

  constructor(private store: Store<fromRoot.AppState>) {
  }

  ngOnInit() {
    this.user = this.store.select(fromRoot.getUserById(this.pin && this.pin.user_id))
  }

  onClick() {
    try{
      setTimeout(() => {
        let el = $('.pinModal-' + this.pin.id);
        if (el.length) {
          if (el.data('zfPlugin')) {
            el.foundation('open');
          }else{
            new Foundation.Reveal(el);
            el.foundation('open');
          }
        }
      }, 100);
    }catch(e){console.log('.pinModal-' + this.pin.id + e)};
  }

}
