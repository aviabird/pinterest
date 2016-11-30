import { Routes } from '@angular/router';
import { PinDetailComponent } from './pin-detail/pin-detail.component';

export const PINS_ROUTES: Routes = [
  { path: ':id', component: PinDetailComponent }
];