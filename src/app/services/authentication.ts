import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2';

@Injectable()
export class Authentication {

  constructor(
    public af: AngularFire
  ) {};

  login(from: string) {
    this.af.auth.login({
      provider: this._getProvider(from)
    });
  }
  
  logout() {
    this.af.auth.logout();
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