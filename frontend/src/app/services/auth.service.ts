import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  access_token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private tokenKey = 'access_token'; // Key to store JWT token

  constructor(private http: HttpClient) {}

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data);
  }

  // Should call the backend login endpoint and store the JWT token
  login(data: LoginData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap((response: AuthResponse) => {
        // Store the JWT token upon successful login
        localStorage.setItem(this.tokenKey, response.access_token);
      }),
    );
  }

  // Should clear the stored JWT token
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  // Store JWT token in localStorage or sessionStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Return true if user is authenticated (has valid token)
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
