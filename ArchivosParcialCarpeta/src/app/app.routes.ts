import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { FileExplorer } from './file-explorer/file-explorer';
import { Login } from './login/login';
import { Register } from './register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'files', component: FileExplorer, canActivate: [authGuard] },
  { path: '', redirectTo: 'files', pathMatch: 'full' },
  { path: '**', redirectTo: 'files' },
];
