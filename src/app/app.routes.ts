import { AppComponent } from './app.component';
import { PinsComponent } from './components/pins/pins.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pins',
    pathMatch: 'full'
  },
  {
    path: 'pins',
    component: PinsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutes {}