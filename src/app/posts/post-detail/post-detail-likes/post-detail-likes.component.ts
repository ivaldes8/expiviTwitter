import { LikesService } from './../../likes.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail-likes',
  standalone: false,

  templateUrl: './post-detail-likes.component.html',
  styleUrl: './post-detail-likes.component.css'
})
export class PostDetailLikesComponent {;
  @Input() likes: number = 0;
  likesData: any[] = [];
  postId: string | null = null;

  constructor(private toastr: ToastrService, private likesService: LikesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getLikes();
  }

  getLikes() {
    if (!this.postId) {
      return;
    }

    this.likesService.getPostLikes(parseInt(this.postId as string)).subscribe(
      (response) => {
        this.likes = response?.data.length;
        this.likesData = response?.data;
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }

  onLike() {
    this.likesService.createPostLike(parseInt(this.postId as string)).subscribe(
      (response) => {
        this.getLikes();
      },
      (error) => {
        console.log(error, "ERR")
        if (error.error.message === "Post is already liked") {
          this.onDislike();
        }
        // this.toastr.error(error.error.message);
      }
    );
  }

  onDislike() {
    this.likesService.deletePostLike(parseInt(this.postId as string)).subscribe(
      (response) => {
        this.getLikes();
      },
      (error) => {
        this.toastr.error(error.message);
      }
    );
  }
}
