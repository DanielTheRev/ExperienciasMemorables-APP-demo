import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class AppComponent implements AfterViewInit, OnInit {
  theme: string = 'ligth';
  loading = false;
  private LoginService = inject(AuthService);
  ngOnInit(): void {
    this.LoginService.VerifyUserToken().subscribe({
      next: (res) => {
        if (!res.valid) {
          localStorage.removeItem('cc');
          this.loading = false;
        }
      },
    });
  }
  ngAfterViewInit(): void {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (ev) => {
        this.theme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'ligth';
      });
  }
}
