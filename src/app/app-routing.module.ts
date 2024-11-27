import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PostsComponent } from './posts/posts.component';
import { AuthGuard } from './auth/auth.guard';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: PostsComponent
  },
  {
    path: 'posts',
    canActivate: [AuthGuard],
    component: PostsComponent,
  },
  {
    path: 'posts/user/:userId',
    canActivate: [AuthGuard],
    component: PostsComponent,
  },
  {
    path: 'posts/new',
    canActivate: [AuthGuard],
    component: NewPostComponent,
  },
  {
    path: 'posts/:id',
    canActivate: [AuthGuard],
    component: PostDetailComponent,
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
