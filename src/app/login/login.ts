import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  submit(): void {
    if (this.authService.login(this.email, this.password)) {
      this.errorMessage = '';
      void this.router.navigate(['/exercise1']);
      return;
    }

    this.errorMessage = 'Credenciales inválidas';
  }
}
