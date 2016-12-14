import { Routes } from '@angular/router';
import { PinDetailComponent } from './pin-detail/pin-detail.component';
import { PinEditComponent } from './pin-edit/pin-edit.component';
import { CanActivateViaAuthGuard } from '../../guards/authenticated';
import { CanEditPinGuard } from '../../guards/can-edit-pin';

export const PINS_ROUTES: Routes = [
  { path: 'new', component: PinEditComponent , canActivate: [CanActivateViaAuthGuard]},
  { path: ':id', component: PinDetailComponent },
  { path: ':id/edit', component: PinEditComponent,
    canActivate: [ CanActivateViaAuthGuard, CanEditPinGuard ]
  }
];