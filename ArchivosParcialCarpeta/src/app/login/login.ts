import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../auth.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  readonly errorMessage = signal('');
  readonly isSubmitting = signal(false);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async submit(): Promise<void> {
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    try {
      await this.auth.login(this.email, this.password);
      await this.router.navigate(['/files']);
    } catch (error) {
      this.errorMessage.set(this.describeError(error, 'No fue posible iniciar sesión.'));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private describeError(error: unknown, fallback: string): string {
    if (error instanceof FirebaseError && error.code.startsWith('auth/')) {
      return 'El correo o la contraseña no son válidos. Verifica los datos e inténtalo de nuevo.';
    }
    return error instanceof Error ? error.message : fallback;
  }
}
