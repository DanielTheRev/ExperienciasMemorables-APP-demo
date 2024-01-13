import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = `${environment.server_uri}/api/login`;
  private _http = inject(HttpClient);
  private _Router = inject(Router);
  // private _TokenStore = inject(TokenStoreService);

  Login(user: { username: string; password: string }) {
    return this._http
      .post<{
        success: boolean;
        token: string;
      }>(`${this.apiURL}/logIn`, user)
      // .pipe(
      //   map((e) => {
      //     if (e.success) {
      //       localStorage.setItem('cc', e.token);
      //       this._Router.navigate(['']);
      //       this._TokenStore.setToken(e.token, e.success);
      //     }
      //     this._TokenStore.setToken('', e.success);

      //     return e.success;
      //   })
      // );
  }

  VerifyUserToken() {
    const token = localStorage.getItem('cc');
    return this._http
      .post<{
        valid: boolean;
      }>(`${this.apiURL}/verify`, {
        token,
      })
      // .pipe(
      //   map((res) => {
      //     if (!res.valid) {
      //       localStorage.removeItem('cc');
      //       this._Router.navigate(['login']);
      //       return res.valid;
      //     }
      //     console.log('redirigiendo');
      //     this._Router.navigate(['']);

      //     return res.valid;
      //   })
      // );
  }
}
