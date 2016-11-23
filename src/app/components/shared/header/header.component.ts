import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducers';
import { LoginAction, LogoutAction, LogoutSuccessAction } from '../../../actions/user-auth';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'pin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Pinterest';
  user: Observable<User>;
  userIsAuthenticated: Observable<boolean>;

  constructor(
    private authService: AuthenticationService,
    private store: Store<AppState>
  ) {
    this.user = store.let(fromRoot.getUser);
    this.userIsAuthenticated = store.let(fromRoot.getUserAuthStatus);
  }

  ngOnInit() {
  }

  login(provider: string) {
    this.store.dispatch(new LoginAction(provider));
  }
  
  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
