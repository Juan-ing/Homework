import { computed, Injectable, signal } from '@angular/core';
import type { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly user = signal<User | null>(null);
  readonly currentUser = this.user.asReadonly();
  readonly isLoggedIn = computed(() => this.user() !== null);
  private readonly authStateReady: Promise<void>;

  constructor(private readonly supabase: SupabaseService) {
    this.supabase.client.auth.onAuthStateChange((_event, session) => {
      this.user.set(session?.user ?? null);
    });

    this.authStateReady = this.supabase.client.auth.getSession().then(({ data, error }) => {
      if (error) {
        throw error;
      }
      this.user.set(data.session?.user ?? null);
    });
  }

  async login(email: string, password: string): Promise<void> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    if (error) {
      throw error;
    }
  }

  async register(email: string, password: string): Promise<boolean> {
    const { data, error } = await this.supabase.client.auth.signUp({ email, password });
    if (error) {
      throw error;
    }
    return data.session !== null;
  }

  async logout(): Promise<void> {
    const { error } = await this.supabase.client.auth.signOut();
    if (error) {
      throw error;
    }
  }

  waitForAuthState(): Promise<void> {
    return this.authStateReady;
  }
}
