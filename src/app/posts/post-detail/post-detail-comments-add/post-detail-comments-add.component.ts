import { CommentsService } from './../../comments.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail-comments-add',
  standalone: false,

  templateUrl: './post-detail-comments-add.component.html',
  styleUrl: './post-detail-comments-add.component.css'
})
export class PostDetailCommentsAddComponent {

  @Output() commentAdded = new EventEmitter<void>();

  isLoading: boolean = false
  commentForm: FormGroup;
  error: string = '';
  postId: string | null = null;

  constructor(private toastr: ToastrService, private commentsService: CommentsService, private route: ActivatedRoute) {
    this.commentForm = new FormGroup({
      text: new FormControl("", []),
    });
  }

  get textControl(): FormControl {
    return this.commentForm.get('text') as FormControl;
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
  }

  onComment() {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const { text } = this.commentForm.value;

    this.commentsService.createPostComment(parseInt(this.postId as string), text).subscribe(
      (response) => {
        this.toastr.success('Comment created successfully');
        this.commentAdded.emit();
        this.isLoading = false;
        this.commentForm.reset();
      },
      (error) => {
        this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );
  }

  onCancel() {
    this.commentForm.reset();
  }
}
