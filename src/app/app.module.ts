import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { StoreModule } from '@ngrx/store';
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyA4tjVj427twh-n3lOAAniS-x9knzdw7vM",
  authDomain: "pinterest-da3ba.firebaseapp.com",
  databaseURL: "https://pinterest-da3ba.firebaseio.com",
  storageBucket: "pinterest-da3ba.appspot.com",
  messagingSenderId: "1047429115771"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig, {
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }),
    StoreModule.provideStore({ router: routerReducer }),
    RouterStoreModule.connectRouter()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
