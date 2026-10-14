import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  imports: [RouterLink, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  readonly auth = inject(AuthService);
  readonly errorMessage = signal('');
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    this.errorMessage.set('');
    try {
      await this.auth.logout();
      await this.router.navigate(['/login']);
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No fue posible cerrar sesión.',
      );
    }
  }
}
