import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { CommentsService } from '../../comments.service';

@Component({
  selector: 'app-post-detail-comments',
  standalone: false,

  templateUrl: './post-detail-comments.component.html',
  styleUrl: './post-detail-comments.component.css'
})
export class PostDetailCommentsComponent {
  postId: string | null = null;
  comments: any[] = [];

  constructor(private commentsService: CommentsService, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.fetchPostComments();
  }

  fetchPostComments() {
    if (!this.postId) {
      return;
    }

    this.commentsService.getPostComments(Number(this.postId)).subscribe(
      (response) => {
        this.comments = response?.data;
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }

  onCommentAdded() {
    this.fetchPostComments();
  }
}
