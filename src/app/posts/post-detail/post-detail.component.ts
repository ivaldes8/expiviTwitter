import { Location } from '@angular/common';
import { PostsService } from './../posts.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-detail',
  standalone: false,

  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent {
  postId: string | null = null;
  post: any = null;

  constructor(private route: ActivatedRoute, private PostsService: PostsService, private toastr: ToastrService, private location: Location) { }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.fetchPostDetail();
  }

  goBack() {
    this.location.back();
  }

  fetchPostDetail() {
    if (!this.postId) {
      return;
    }

    this.PostsService.getPost(Number(this.postId)).subscribe(
      (response) => {
        this.post = response?.data;
      },
      (error) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
