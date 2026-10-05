import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
	readonly isLoggedIn = signal(false);
	readonly currentUser = signal<string | null>(null);

	login(email: string, password: string): boolean {
		if (email !== 'user@mail.com' || password !== '123') {
			return false;
		}

		this.currentUser.set(email);
		this.isLoggedIn.set(true);
		return true;
	}

	logout(): void {
		this.isLoggedIn.set(false);
		this.currentUser.set(null);
	}
}
