import { AppComponent } from './app.component';
import { PinsComponent } from './components/pins/pins.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PINS_ROUTES } from './components/pins/pins.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pins',
    pathMatch: 'full'
  },
  {
    path: 'pins',
    component: PinsComponent,
    children: PINS_ROUTES
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutes {}