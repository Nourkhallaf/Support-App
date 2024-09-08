import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly adminUsername = 'admin';
  private readonly adminPassword = 'password';
  private loggedIn = false;  

  login(username: string, password: string): boolean {
    if (username === this.adminUsername && password === this.adminPassword) {
      this.loggedIn = true;
      localStorage.setItem('isLoggedIn', 'true');  
      return true;
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('isLoggedIn');  
  }

  isLoggedIn(): boolean {
    return this.loggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}
