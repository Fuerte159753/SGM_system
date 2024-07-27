// autorizacion.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class autorizacionAdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined') {
      const keytecExists = !!window.sessionStorage.getItem('keyAdmin');

      if (!keytecExists) {

        this.router.navigate(['/Login']);
        return false;
      }
    }

    return true;
  }
}