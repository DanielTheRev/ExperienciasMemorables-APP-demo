import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private formBuilder = inject(FormBuilder);
  private _AuthService = inject(AuthService);
  private _Router = inject(Router);
  hasError = false;
  form: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  handleSubmit() {
    if (this.form.invalid) {
      this.hasError = false;
      return;
    }

    this._AuthService.Login(this.form.value).subscribe({
      next: (res) => {
        if (!res.success) {
          this.hasError = true;
          return;
        }
        localStorage.setItem('cc', res.token);
        this._Router.navigate(['dashboard']);
        return;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
