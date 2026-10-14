import { Injectable, computed, signal } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential,
} from 'firebase/auth';
import { auth } from '../firebase/config.js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user = signal<User | null>(auth.currentUser);
  readonly currentUser = this.user.asReadonly();
  readonly isLoggedIn = computed(() => this.user() !== null);
  private readonly authStateReady: Promise<void>;

  constructor() {
    let resolveAuthState: () => void = () => {};
    this.authStateReady = new Promise<void>((resolve) => {
      resolveAuthState = resolve;
    });

    onAuthStateChanged(auth, (user) => {
      this.user.set(user);
      resolveAuthState();
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }

  waitForAuthState(): Promise<void> {
    return this.authStateReady;
  }
}
