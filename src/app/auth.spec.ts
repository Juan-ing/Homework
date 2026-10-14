import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('derives the logged-in state from the current Firebase user', () => {
    expect(service.isLoggedIn()).toBe(service.currentUser() !== null);
  });

  it('waits until Firebase resolves the initial authentication state', async () => {
    await expect(service.waitForAuthState()).resolves.toBeUndefined();
  });
});
