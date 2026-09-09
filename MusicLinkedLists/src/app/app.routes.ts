import { Routes } from '@angular/router';
import { SongsComponent } from './pages/songs/songs';
import { BrowserHistoryComponent } from './browser-history/browser-history';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'songs',
    pathMatch: 'full'
  },
  {
    path: 'songs',
    component: SongsComponent
  },
  {
    path: 'history',
    component: BrowserHistoryComponent
  }
];