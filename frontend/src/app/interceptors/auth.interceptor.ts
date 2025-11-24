import { HttpInterceptorFn } from '@angular/core';

// TODO for candidates: Implement HTTP interceptor to add JWT token to requests
// This interceptor should:
// 1. Get the token from AuthService
// 2. Add it to the Authorization header for all outgoing requests
// 3. Handle errors (e.g., redirect to login on 401)

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // FIXME: This is incomplete - needs to add Authorization header with JWT token
  // Example (uncomment and complete):
  // const authService = inject(AuthService);
  // const token = authService.getToken();
  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  // }

  return next(req);
};
