import { Routes } from '@angular/router';
import { WaitingList } from './waiting-list/waiting-list';
import { HistoryList } from './history-list/history-list';
import { DoctorsRotation } from './doctors-rotation/doctors-rotation';
import { Committee } from './committee/committee';

export const routes: Routes = [
  { path: '', redirectTo: 'waiting-list', pathMatch: 'full' },
  { path: 'waiting-list', component: WaitingList },
  { path: 'history-list', component: HistoryList },
  { path: 'doctors-rotation', component: DoctorsRotation },
  { path: 'committee', component: Committee },
];
