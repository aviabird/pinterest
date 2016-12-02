import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import * as fromUserAuth from '../reducers/user-auth';

@Injectable()
export class AuthenticationService {
  userAuth: Observable<any>;

  constructor(
    public af: AngularFire
  ) {
    this.userAuth = this.af.auth.map(
      user => this._changeState(user),
      error => console.trace(error),
    );
  };

  login(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from)
    });
    return this.userAuth
  }

  logout() {
    this.af.auth.logout();
    return this.userAuth;
  }

  authStatus() {
    return this.userAuth;
  }

  findbyIds(ids: string[]) {
    return  this.af.database.list('/users').map(
      users => users.filter(user => ids.indexOf(user.$key) > -1)
    )
    .map(users => users.map(user => new User(user)))
  }

  findbyEmail(email: string){
    return  this.af.database.list('/users', {
      query: {
        orderByChild: 'email',
        equalTo: email,
        limitToFirst: 1,
      }
    })
  }

  storeNewUser(userAuth: fromUserAuth.State){
    let user = userAuth.user;
    this.findbyEmail(user.email).subscribe(
      users => {
        if(!users.length) {
          this.af.database.list('/users').push(user);
        }
      }
    ).unsubscribe();
    return userAuth;
  }

  private _changeState(user: any = null) {
    if(user) {
      return {
        user: this._getUserInfo(user),
        isAuthenticated: true,
        users: [user]
      }
    }
    else {
      return {
        user: null,
        isAuthenticated: false,
        users: null
      }
    }
  }

  private _getUserInfo(user: any): any {
    if(!user) {
      return {};
    }
    let data = user.auth.providerData[0];
    return {
      name: data.displayName,
      avatar: data.photoURL,
      email: data.email,
      provider: data.providerId
    };
  }

  private _getProvider(from: string) {
    switch(from){
      case 'twitter': return AuthProviders.Twitter;
      case 'facebook': return AuthProviders.Facebook;
      case 'github': return AuthProviders.Github;
      case 'google': return AuthProviders.Google;
    }
  }
}