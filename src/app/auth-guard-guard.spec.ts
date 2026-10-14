import { TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { CanActivateFn, provideRouter, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth';
import { authGuard } from './auth-guard-guard';

describe('authGuard', () => {
  const isLoggedIn = signal(false);
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    isLoggedIn.set(false);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: isLoggedIn.asReadonly(),
            waitForAuthState: () => Promise.resolve(),
          },
        },
      ],
    });
  });

  it('redirects unauthenticated users to login', async () => {
    const result = await executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBeInstanceOf(UrlTree);
  });

  it('allows authenticated users', async () => {
    isLoggedIn.set(true);
    const result = await executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBe(true);
  });
});
