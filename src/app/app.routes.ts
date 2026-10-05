import { Routes } from '@angular/router';
import { Exercise1 } from './exercise1/exercise1';
import { Exercise2 } from './exercise2/exercise2';
import { Login } from './login/login';
import { authGuard } from './auth-guard-guard';

export const routes: Routes = [
	{ path: 'login', component: Login },
	{ path: 'exercise1', component: Exercise1, canActivate: [authGuard] },
	{ path: 'exercise2', component: Exercise2, canActivate: [authGuard] },
	{ path: '', redirectTo: 'login', pathMatch: 'full' },
	{ path: '**', redirectTo: 'login' },
];
