import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PinsComponent } from './components/pins/pins.component';

export const routes: Routes = [
  {
    path: '',
    component: PinsComponent
  }
];