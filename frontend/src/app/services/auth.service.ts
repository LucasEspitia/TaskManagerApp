import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token?: string;
  id?: string;
  email?: string;
  name?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  // TODO for candidates: Implement login method
  // Should call the backend login endpoint and store the JWT token
  login(data: LoginData): Observable<AuthResponse> {
    // FIXME: This is incomplete - needs to call backend and handle token storage
    throw new Error('Login method not implemented yet');
  }

  // TODO for candidates: Implement logout method
  // Should clear the stored JWT token
  logout(): void {
    // FIXME: Implement token removal from storage
    throw new Error('Logout method not implemented yet');
  }

  // TODO for candidates: Implement token storage and retrieval
  // Store JWT token in localStorage or sessionStorage
  getToken(): string | null {
    // FIXME: Implement token retrieval
    return null;
  }

  // TODO for candidates: Implement authentication check
  // Return true if user is authenticated (has valid token)
  isAuthenticated(): boolean {
    // FIXME: Implement authentication check
    return false;
  }
}
