import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts.component';
import { PostsHeaderComponent } from './posts-header/posts-header.component';
import { CoreModule } from '../core/core.module';
import { NewPostComponent } from './new-post/new-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostDetailCommentsComponent } from './post-detail/post-detail-comments/post-detail-comments.component';
import { PostDetailCommentsAddComponent } from './post-detail/post-detail-comments-add/post-detail-comments-add.component';
import { PostDetailLikesComponent } from './post-detail/post-detail-likes/post-detail-likes.component';



@NgModule({
  declarations: [
    PostsComponent,
    PostsHeaderComponent,
    NewPostComponent,
    ListPostsComponent,
    PostDetailComponent,
    PostDetailCommentsComponent,
    PostDetailCommentsAddComponent,
    PostDetailLikesComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports: [
    PostsComponent
  ]
})
export class PostsModule { }
