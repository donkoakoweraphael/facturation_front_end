import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private router: Router
  ) { }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.router.navigateByUrl('/achat');
  }

  removeToken(): void {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }

  isLogged(): boolean {
    const token = localStorage.getItem('token')
    return !! token;
  }

  redirigerSiDejaConnecte() {
    if (this.isLogged()) {
      this.router.navigateByUrl("/achat")
    }
  }

  redirigerSiPasConnecte() : void {
    if (!this.isLogged()) {
      this.router.navigateByUrl("/login")
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  clearTokenExpired() {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/login')
  }
}
