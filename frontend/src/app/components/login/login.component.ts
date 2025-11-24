import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  // TODO for candidates: Add form validation
  // TODO for candidates: Handle errors and show user feedback
  onSubmit() {
    try {
      // FIXME: This will fail because login is not implemented in AuthService
      this.authService.login({ email: this.email, password: this.password }).subscribe({
        next: (response) => {
          // TODO: Store token and navigate to tasks
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login error:', error);
        },
      });
    } catch (error) {
      this.errorMessage = 'Login functionality not yet implemented';
    }
  }
}
