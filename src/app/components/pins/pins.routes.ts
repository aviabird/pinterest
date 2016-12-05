import { Routes } from '@angular/router';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { PinEditComponent } from './pin-edit/pin-edit.component';

export const PINS_ROUTES: Routes = [
  { path: 'new', component: PinEditComponent },
  { path: ':id', component: PinDetailComponent },
  { path: ':id/edit', component: PinEditComponent }
];