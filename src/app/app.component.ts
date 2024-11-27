import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpiviTwitter';

  isOpen = false;

  constructor(private authService: AuthService) { }

  async ngOnInit() {
    await this.authService.autoLogin();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
}
