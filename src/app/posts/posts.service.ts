import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface PostFormData {
  type: 'text' | 'video' | 'picture';
  text: string;
  video_url?: string;
  picture_url?: string;
}

export interface PostData {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  like_count: number;
  content: {
    text?: string;
    video_url?: string;
    picture_url?: string;
    type: 'text' | 'video' | 'picture';
  };
}

export interface ApiResponse {
  data: PostData[];
  next_cursor: string | null;
}

export interface PostDetailData {
  data: PostData;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPosts(cursor: string | null = null) {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }

    return this.http.get<ApiResponse>(`${environment.API_URL}/posts`, {
      params,
    });
  }

  getPostsByUserId(cursor: string | null = null, userId: number) {
    let params = new HttpParams();
    if (cursor) {
      params = params.set('cursor', cursor);
    }

    return this.http.get<ApiResponse>(`${environment.API_URL}/users/${userId}/posts`);
  }

  getPost(id: number) {
    return this.http.get<PostDetailData>(`${environment.API_URL}/posts/${id}`);
  }

  pollNewPosts(since: number | null) {
    let params = new HttpParams();
    if (since) {
      params = params.set('since', since.toString());
    }

    return this.http.get<PostData[]>(`${environment.API_URL}/posts/poll`, {
      params,
    });
  }

  createPost(data: PostFormData) {
    return this.http.post(`${environment.API_URL}/posts`, data)
  }

  deletePost(id: number) {
    return this.http.delete(`${environment.API_URL}/posts/${id}`)
  }
}
