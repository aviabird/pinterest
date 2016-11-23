import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication';
import { User } from '../../../models/user';
import { Store } from '@ngrx/store';
import { State } from '../../../reducers/user-auth';
import { LoginAction, LogoutAction } from '../../../actions/user-auth';
import * as fromRoot from '../../../reducers';

@Component({
  selector: 'pin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'Pinterest';
  user: {};

  constructor(
    private authService: AuthenticationService,
    private store: Store<State>
  ) {
    this.user = store.let(fromRoot)
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
