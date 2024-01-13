import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const RedirectUser: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const Token = localStorage.getItem('cc');
  if (!Token) {
    if (state.url !== '/login') {
      _Router.navigate(['login']);
    }
    return true;
  }
  if (state.url === '/login') {
    _Router.navigate(['/']);
    return true;
  }
  return true;
  // if (!tokenState) return state.url !== '/login' ? true : false;

  // if (tokenState.valid) return state.url === '/login' ? false : true;
  // return state.url === '/login' ? true : false;
};
