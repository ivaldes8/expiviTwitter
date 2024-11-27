import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface CommentData {
  id: number;
  user_id: number;
  post_id: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface CommentsResponse {
  data: CommentData[];
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) { }

  getPostComments(id: number) {
    return this.http.get<CommentsResponse>(`${environment.API_URL}/posts/${id}/comments`);
  }

  createPostComment(id: number, comment: string) {
    return this.http.post(`${environment.API_URL}/posts/${id}/comments`, { text: comment });
  }

  deleteComment(id: number) {
    return this.http.delete(`${environment.API_URL}/comments/${id}`);
  }
}
