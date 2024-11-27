import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-posts-header',
  standalone: false,

  templateUrl: './posts-header.component.html',
  styleUrl: './posts-header.component.css'
})
export class PostsHeaderComponent {

  hideAddButton: boolean = false;
  userId: string | null = null;
  @Output() searchQueryChanged = new EventEmitter<string>()

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.hideAddButton = this.userId ? true : false;
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value.trim().toLowerCase();
    this.searchQueryChanged.emit(query);
  }

  onNewPost() {
    this.router.navigate(['/posts/new']);
  }
}
