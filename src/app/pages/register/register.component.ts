import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-register',
  styleUrl: './register.component.css',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email = '';
  password = '';
  readonly errorMessage = signal('');
  readonly isSubmitting = signal(false);

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async submit(): Promise<void> {
    this.errorMessage.set('');
    this.isSubmitting.set(true);
    try {
      const hasSession = await this.authService.register(this.email.trim(), this.password);
      if (hasSession) {
        await this.router.navigate(['/tasks']);
      } else {
        this.errorMessage.set(
          'Cuenta creada. Revisa tu correo y confirma la cuenta antes de iniciar sesión.',
        );
      }
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No fue posible crear la cuenta.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
