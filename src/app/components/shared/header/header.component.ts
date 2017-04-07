import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication';
import {User} from '../../../models/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import * as userAuth from '../../../actions/user-auth';
import * as fromRoot from '../../../reducers';
import {Observable} from 'rxjs/Observable';
import {LoginSuccessAction} from '../../../actions/user-auth';
import { GetPinsAction, SearchPinAction } from '../../../actions/pin';

@Component({
  selector: 'pin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  title = 'PinWork';
  user: Observable < User >;
  userIsAuthenticated: Observable < boolean >;
  items: string[];

  constructor(private authService: AuthenticationService, private store : Store < AppState >)
  {
    this.user = store.select(fromRoot.getAuthUser);
    this.userIsAuthenticated = store.select(fromRoot.getUserAuthStatus);
  }

  ngOnInit() {
    this
      .store
      .dispatch(new userAuth.CheckAuthAction());
  }

  login(provider: string) {
    this
      .store
      .dispatch(new userAuth.LoginAction(provider));
  }

  logout() {
    this
      .store
      .dispatch(new userAuth.LogoutAction());
  }

  onItemAdded(event) {
    this.items.pop();
    this.items.push(event.value);
    this.onsearch();
  }

  onItemRemoved() {
    this.onsearch();
  }

  onsearch() {
    let search_string = this.items.join(',');
    this.store.dispatch(new SearchPinAction(search_string));
    this.store.dispatch(new GetPinsAction(search_string));
  }

}
