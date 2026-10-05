import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('authenticates only the expected credentials', () => {
    expect(service.login('user@mail.com', 'wrong')).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
    expect(service.login('user@mail.com', '123')).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.currentUser()).toBe('user@mail.com');
  });

  it('clears the authenticated user on logout', () => {
    service.login('user@mail.com', '123');
    service.logout();

    expect(service.isLoggedIn()).toBe(false);
    expect(service.currentUser()).toBeNull();
  });
});
