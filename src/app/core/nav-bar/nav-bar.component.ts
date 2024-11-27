import { Component } from '@angular/core';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: false,

  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  isUserLoggedIn = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      this.isUserLoggedIn = !!user;
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
