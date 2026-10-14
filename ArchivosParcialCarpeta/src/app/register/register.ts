import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from 'firebase/app';
import { AuthService } from '../auth.service';

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
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  async submit(): Promise<void> {
    this.isSubmitting.set(true);
    this.errorMessage.set('');
    try {
      await this.auth.register(this.email, this.password);
      await this.router.navigate(['/files']);
    } catch (error) {
      this.errorMessage.set(this.describeError(error));
    } finally {
      this.isSubmitting.set(false);
    }
  }

  private describeError(error: unknown): string {
    if (error instanceof FirebaseError) {
      if (error.code === 'auth/email-already-in-use') {
        return 'Ya existe una cuenta para este correo.';
      }
      if (error.code === 'auth/weak-password') {
        return 'La contraseña debe tener al menos seis caracteres.';
      }
    }
    return error instanceof Error ? error.message : 'No fue posible crear la cuenta.';
  }
}
