import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AngularFireDatabase } from 'angularfire2';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ApiUrl } from '../app.api-url';
import { HttpService } from './http';

@Injectable()
export class AuthenticationService {
  userAuth: Observable<any>;

  constructor(
    public af: AngularFire,
    public db: AngularFireDatabase,
    public http: HttpService,
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
    localStorage.removeItem('access_token')
    return this.userAuth;
  }

  authStatus() {
    return this.userAuth;
  }

  findbyIds(ids: string[]) {
    return  this.http.get('users')
      .map(res => res.json().data)
      .map(users => users.filter(user => ids.indexOf(user.id) > -1))
      .map(users => users.map(user => new User(user)))
  }

  findbyUID(id: string){
    return this.http.get(`users/${id}`)
      .map(res => res.json().data)
  }

  getAccessToken(userAuth) {
    return this.http.post("users/auth", userAuth)
      .map(res => res.json())
      .map(data => {
        let token = data.token;
        localStorage.setItem('access_token', token);

        return Object.assign(userAuth, {
          access_token: token,
          user: data.user
        })
      })
  }

  updateUserAuth(userAuth) {
    let user = userAuth.user;

    return this.findbyUID(user.id).map(
      user => {
        return Object.assign({}, userAuth, {
          user: new User(user)
        });
      }
    )
  }

  private _changeState(user: any = null) {
    if(user) {
      return {
        user: this._getUserInfo(user),
        isAuthenticated: true
      }
    }
    else {
      return {
        user: null,
        isAuthenticated: false
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
      provider: data.providerId,
      uid: user.auth.uid
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