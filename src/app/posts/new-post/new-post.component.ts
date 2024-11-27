import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-post',
  standalone: false,

  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {

  isLoading: boolean = false;
  postForm: FormGroup;
  inputLabel = 'Text';
  error: string = '';

  constructor(private toastr: ToastrService, private postsService: PostsService, private location: Location, private router: Router) {
    this.postForm = new FormGroup({
      type: new FormControl("", [Validators.required]),
      text: new FormControl("", [Validators.required]),
    });

    this.postForm.get('type')?.valueChanges.subscribe((value) => {
      if (value === 'text') {
        this.inputLabel = 'Text';
      } else if (value === 'picture') {
        this.inputLabel = 'Picture URL';
      } else if (value === 'video') {
        this.inputLabel = 'Video URL';
      } else {
        this.inputLabel = 'Text';
      }
    });
  }

  get typeControl(): FormControl {
    return this.postForm.get('type') as FormControl;
  }

  get textControl(): FormControl {
    return this.postForm.get('text') as FormControl;
  }

  onGoBack() {
    this.location.back();
  }

  async onSubmit() {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      return;
    }
    let postObs: Observable<any>;
    const { type, text } = this.postForm.value;

    const toSend = {
      type,
      text: type === 'text' ? text : '',
      picture_url: type === 'picture' ? text : null,
      video_url: type === 'video' ? text : null,
    }

    if (type === 'text') {
      delete toSend.picture_url;
      delete toSend.video_url;
    } else if (type === 'picture') {
      delete toSend.video_url;
      delete toSend.text;
    } else {
      delete toSend.picture_url;
      delete toSend.text;
    }

    postObs = await this.postsService.createPost(toSend);

    postObs.subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigateByUrl('/posts');
      },
      error => {
        console.log(error, 'ERROR')
        this.error = 'Usuario o contraseña incorrectos'
        this.toastr.error(error.error.message);
        this.isLoading = false;
      }
    );
  }
}
