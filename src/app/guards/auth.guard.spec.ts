import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  provideRouter,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const loggedIn = signal(false);
  const executeGuard: CanActivateFn = (...parameters) =>
    TestBed.runInInjectionContext(() => authGuard(...parameters));

  beforeEach(() => {
    loggedIn.set(false);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: loggedIn.asReadonly(),
            waitForAuthState: () => Promise.resolve(),
          },
        },
      ],
    });
  });

  it('redirects unauthenticated users to login', async () => {
    const result = await executeGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
    );

    expect(result).toBeInstanceOf(UrlTree);
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/login');
  });

  it('allows authenticated users', async () => {
    loggedIn.set(true);
    const result = await executeGuard(
      {} as ActivatedRouteSnapshot,
      {} as RouterStateSnapshot,
    );

    expect(result).toBe(true);
  });
});
