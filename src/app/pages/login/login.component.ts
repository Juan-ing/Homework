import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
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
      await this.authService.login(this.email.trim(), this.password);
      await this.router.navigate(['/tasks']);
    } catch (error) {
      this.errorMessage.set(
        error instanceof Error ? error.message : 'No fue posible iniciar sesión.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
