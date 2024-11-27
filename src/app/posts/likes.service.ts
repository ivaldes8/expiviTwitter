import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  constructor(private http: HttpClient) { }

  getPostLikes(id: number) {
    return this.http.get<any>(`${environment.API_URL}/posts/${id}/likes`);
  }

  createPostLike(id: number) {
    return this.http.post(`${environment.API_URL}/posts/${id}/likes`, {});
  }

  deletePostLike(id: number) {
    return this.http.delete(`${environment.API_URL}/posts/${id}/likes`);
  }
}
