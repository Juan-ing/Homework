import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
  { path: 'atm-queue', component: App },
  { path: '', redirectTo: 'atm-queue', pathMatch: 'full' },
];
