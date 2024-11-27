import { Component, HostListener, Input, SimpleChanges } from '@angular/core';
import { PostsService } from '../posts.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-posts',
  standalone: false,
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css'],
})
export class ListPostsComponent {
  @Input() searchQuery: string = '';
  userId: string | null = null;
  isLoading = false;
  isFetchingMore = false;
  noData = false;
  postList: any[] = [];
  filteredPostList: any[] = [];
  nextCursor: string | null = null;
  lastTimestamp: number | null = Math.floor(Date.now() / 1000);

  constructor(
    private postService: PostsService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.fetchPosts();

    if (!this.userId) {
      this.startPolling();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchQuery'] && this.searchQuery !== undefined) {
      this.filterPosts();
    }
  }

  goToPostDetail(postId: number) {
    this.router.navigate(['/posts', postId]);
  }

  fetchPosts(isLoadMore: boolean = false) {
    if (isLoadMore && !this.nextCursor) {
      return;
    }

    if (isLoadMore) {
      this.isFetchingMore = true;
    } else {
      this.isLoading = true;
    }

    const fetchMethod = this.userId
      ? this.postService.getPostsByUserId.bind(this.postService, this.nextCursor, Number(this.userId))
      : this.postService.getPosts.bind(this.postService, this.nextCursor);

    fetchMethod().subscribe(
      (response) => {
        const { data, next_cursor } = response;

        if (data.length > 0) {
          this.postList = [...this.postList, ...data];
          this.filteredPostList = [...this.postList];
          this.nextCursor = next_cursor;
        } else {
          this.noData = true;
        }

        this.isLoading = false;
        this.isFetchingMore = false;
      },
      (error) => {
        console.error('Error fetching posts:', error);
        this.toastr.error(error.error.message);
        this.isLoading = false;
        this.isFetchingMore = false;
      }
    );
  }
  startPolling() {
    setInterval(() => {
      this.lastTimestamp = Math.floor(Date.now() / 1000);

      this.postService.pollNewPosts(this.lastTimestamp).subscribe((newPosts) => {
        if (newPosts.length > 0) {
          this.postList = [...newPosts, ...this.postList];
        }
      });
    }, 5000);
  }

  filterPosts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPostList = this.postList.filter(
      (post) =>
        post.content.text?.toLowerCase().includes(query) ||
        post.content.type?.toLowerCase().includes(query)
    );
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const bottomOfWindow =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

    if (bottomOfWindow && !this.isFetchingMore && !this.noData) {
      this.fetchPosts(true); // Load more posts
    }
  }
}
