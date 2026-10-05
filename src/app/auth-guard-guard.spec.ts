import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter, RouterStateSnapshot, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth';
import { authGuard } from './auth-guard-guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideRouter([])],
    });
  });

  it('redirects unauthenticated users to login', () => {
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBeInstanceOf(UrlTree);
  });

  it('allows authenticated users', () => {
    TestBed.inject(AuthService).login('user@mail.com', '123');
    const result = executeGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);

    expect(result).toBe(true);
  });
});
