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
  private readonly userState = signal<User | null>(auth.currentUser);
  readonly user = this.userState.asReadonly();
  readonly isLoggedIn = computed(() => this.userState() !== null);
  private readonly authStateReady: Promise<void>;

  constructor() {
    let resolveAuthState: () => void = () => {};
    this.authStateReady = new Promise<void>((resolve) => {
      resolveAuthState = resolve;
    });

    onAuthStateChanged(auth, (user) => {
      this.userState.set(user);
      resolveAuthState();
    });
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email.trim(), password);
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email.trim(), password);
  }

  logout(): Promise<void> {
    return signOut(auth);
  }

  waitForAuthState(): Promise<void> {
    return this.authStateReady;
  }
}
