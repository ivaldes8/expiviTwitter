import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface AuthResponseData {
  data: {
    token: string
  }
}

@Component({
  selector: 'app-auth',
  standalone: false,

  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  isLoginMode = true;
  fetching = false;
  authForm: FormGroup;
  error: string = '';


  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router, private route: ActivatedRoute,) {
    this.authForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', []),
      avatarUrl: new FormControl('', []),
    });
  }

  get emailControl(): FormControl {
    return this.authForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.authForm.get('password') as FormControl;
  }

  get nameControl(): FormControl {
    return this.authForm.get('name') as FormControl;
  }

  get avatarUrlControl(): FormControl {
    return this.authForm.get('avatarUrl') as FormControl;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;

    if (!this.isLoginMode) {
      this.authForm.get('name')?.setValidators([Validators.required]);
      this.authForm.get('avatarUrl')?.setValidators([Validators.required]);
    } else {
      this.authForm.get('name')?.clearValidators();
      this.authForm.get('avatarUrl')?.clearValidators();
    }

    this.authForm.get('name')?.updateValueAndValidity();
    this.authForm.get('avatarUrl')?.updateValueAndValidity();
  }

  async onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    const { email, password, name, avatarUrl } = this.authForm.value;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = await this.authService.login(email, password);
    } else {
      authObs = await this.authService.signup(email, password, name, avatarUrl);
    }

    authObs.subscribe(
      resData => {
        this.fetching = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/posts';
        this.router.navigateByUrl(returnUrl);
      },
      error => {
        console.log(error, 'ERROR')
        this.error = 'Usuario o contraseña incorrectos'
        this.toastr.error(error.error.message);
        this.fetching = false;
      }
    );



    this.router.navigate(['/posts']);

    this.authForm.reset();
  }
}
