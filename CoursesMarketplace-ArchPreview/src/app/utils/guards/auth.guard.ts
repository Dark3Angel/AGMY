import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/data-access/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.currentUserValue) {
    return true;
  }

  // Show login
  localStorage.setItem('redirect','yes'); // для вывода логина
  router.navigateByUrl('about:blank', { skipLocationChange: true }).then(() =>
  router.navigate(['/']));
  return false
};
