import {
  Component, OnInit, ChangeDetectionStrategy, trigger,
  state,
  style,
  transition,
  animate
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Pin } from '../../../models/pin';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import * as pin from '../../../actions/pin';
import * as comment from '../../../actions/comment';
import { User } from '../../../models/user';
import { Comment } from '../../../models/comment';
import { FormBuilder } from '@angular/forms';
import { go } from '@ngrx/router-store';

declare var $: any;
declare var Foundation: any;

@Component({
  selector: 'pin-pin-detail',
  templateUrl: './pin-detail.component.html',
  styleUrls: ['./pin-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('flyInRight', [
      state('in', style({ transform: 'translateX(0)', 'z-index': 0 })),
      transition('void => *', [
        style({ transform: 'translateX(-50%)', opacity: 0, 'z-index': -999 }),
        animate(500)
      ])
    ]),
    trigger('flyInDown', [
      state('in', style({ transform: 'translateY(0)', 'z-index': 0 })),
      transition('void => *', [
        style({ transform: 'translateY(100%)', opacity: 0, 'z-index': -999 }),
        animate(500)
      ])
    ])
  ]
})
export class PinDetailComponent implements OnInit {
  subscription: Subscription;
  pinIndex: string;
  pin: Observable<Pin>;
  comments: Observable<Comment[]>;
  authUser: Observable<User>;
  canAccessPin: Observable<boolean>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRoot.AppState>,
    private formBuilder: FormBuilder
  ) {
    this.pin = this.store.select(fromRoot.getSelectedPin);
    this.comments = this.store.select(fromRoot.getSelectedPinComments);
    this.authUser = this.store.select(fromRoot.getAuthUser);
    this.canAccessPin = this.store.select(fromRoot.getPinAccessStatus);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.pinIndex = params['id'];
        this.store.dispatch(new pin.SelectPinAction(this.pinIndex));

        // Incase Pin is not in store. Load it from api.
        setTimeout(() => this.store.dispatch(new pin.GetSelectedPinAction(this.pinIndex)), 3000);

        this.store.dispatch(new comment.LoadCommentsAction(this.pinIndex));
      }
    );
    this.loadModal();
  }

  loadModal() {
    this.pin.subscribe(
      pin => {
        try {
          let el = $(`.pinModal-${this.pinIndex}`);
          if (el.length) {
            if (el.data('zfPlugin')) {
              el.foundation('open');
            } else {
              new Foundation.Reveal(el);
              el.foundation('open');
            }
          }
        } catch (e) { console.log(e); };
      }
    );
  }

  onCommentDelete(id) {
    this.store.dispatch(new comment.DeleteCommentAction(id));
  }

  onOnDestroy() {
    this.subscription.unsubscribe();
  }

  getUser(id) {
    return this.store.select(fromRoot.getUserById(id));
  }

  onEditPin() {
    this.store.dispatch(go(`/pins/${this.pinIndex}/edit`));
  }

}
