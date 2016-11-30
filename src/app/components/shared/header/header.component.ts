import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication';
import {User} from '../../../models/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../../reducers';
import * as userAuth from '../../../actions/user-auth';
import * as fromRoot from '../../../reducers';
import {Observable} from 'rxjs/Observable';
import {LoginSuccessAction} from '../../../actions/user-auth';

@Component({
  selector: 'pin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  title = 'Pinterest';
  user : Observable < User >;
  userIsAuthenticated : Observable < boolean >;

  constructor(private authService : AuthenticationService, private store : Store < AppState >)
  {
    this.user = store.let(fromRoot.getUser);
    this.userIsAuthenticated = store.let(fromRoot.getUserAuthStatus);
  }

  ngOnInit() {
    this
      .store
      .dispatch(new userAuth.CheckAuthAction());
  }

  login(provider : string) {
    this
      .store
      .dispatch(new userAuth.LoginAction(provider));
  }

  logout() {
    this
      .store
      .dispatch(new userAuth.LogoutAction());
  }

}
