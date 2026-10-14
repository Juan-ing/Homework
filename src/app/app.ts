import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { useAuthState } from './firebase-hooks';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly authState = useAuthState();
  readonly logoutError = signal('');
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.logoutError.set('');
    try {
      await this.authState.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      this.logoutError.set(
        error instanceof Error ? error.message : 'No fue posible cerrar sesión.',
      );
    }
  }
}
