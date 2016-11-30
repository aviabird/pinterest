import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs/rx'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Pin } from '../../../models/pin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers'
import * as pin from '../../../actions/pin';

declare var $:any;

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

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private eleref: ElementRef,
    private store: Store<fromRoot.AppState>
  ) {
    this.pin = this.store.select(fromRoot.getSelectedPin);
    this.store
      .select(fromRoot.getSelectedPin)
      .subscribe(pin => $('body .reveal').foundation('toggle'));
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pinIndex = params['id'];
        this.store.dispatch(new pin.SelectPinAction(this.pinIndex));
      }
    );
  }

  onOnDestroy(){
    this.subscription.unsubscribe()
  }

}
