import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/rx'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Pin } from '../../../models/pin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import * as pin from '../../../actions/pin';
import { User } from '../../../models/user';

declare var $:any;
declare var Foundation:any;

@Component({
  selector: 'pin-pin-detail',
  templateUrl: './pin-detail.component.html',
  styleUrls: ['./pin-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PinDetailComponent implements OnInit {
  private subscription: Subscription;
  private pinIndex: string;
  private pin: Observable<Pin>;
  private user: Observable<User>;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private store: Store<fromRoot.AppState>
  ) {
    this.pin = this.store.select(fromRoot.getSelectedPin);
    this.user = this.store.select(fromRoot.getPinUser);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pinIndex = params['id'];
        this.store.dispatch(new pin.SelectPinAction(this.pinIndex));
      }
    );
    this.loadModal()
  }

  loadModal() {
    this.pin.subscribe(
      pin => {
        try{
          let el = $(`.pinModal-${this.pinIndex}`);
          if (el.length) {
            if (el.data('zfPlugin')) {
              el.foundation('open');
            }else{
              new Foundation.Reveal(el);
              el.foundation('open');
            }
          }
        }catch(e){console.log(e)};
      }
    );
  }

  onOnDestroy(){
    this.subscription.unsubscribe()
  }

}
