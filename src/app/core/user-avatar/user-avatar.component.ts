import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-avatar',
  standalone: false,

  templateUrl: './user-avatar.component.html',
  styleUrl: './user-avatar.component.css'
})
export class UserAvatarComponent {
  @Input() userId: string = '';
  @Input() userDate: string = '';
  public Object = Object;

  constructor(private router: Router) { }

  goToUserPosts() {
    this.router.navigate(['/posts/user', this.userId]);
  }
}
