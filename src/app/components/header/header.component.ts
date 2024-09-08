import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {}

  toggleLogin(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['/']);  
    } else {
      this.router.navigate(['/login']);  
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn(); 
  }
}
