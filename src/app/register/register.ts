import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { useAuthState } from '../firebase-hooks';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: '../login/login.scss',
  templateUrl: './register.html',
})
export class Register {
  email = '';
  password = '';
  readonly errorMessage = signal('');
  readonly isSubmitting = signal(false);

  private readonly authState = useAuthState();
  private readonly router = inject(Router);

  async submit(): Promise<void> {
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    try {
      await this.authState.register(this.email, this.password);
      await this.router.navigate(['/tasks']);
    } catch (error) {
      this.errorMessage.set(this.getErrorMessage(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError && error.code === 'auth/api-key-not-valid') {
      return 'Firebase rechazó la API key configurada. Comprueba en Google Cloud que Identity Toolkit API esté habilitada para el proyecto homeworkbaseall.';
    }

    return error instanceof Error
      ? error.message
      : 'No fue posible crear la cuenta. Inténtalo de nuevo.';
  }
}
