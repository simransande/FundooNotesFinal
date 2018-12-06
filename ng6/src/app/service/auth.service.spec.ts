import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service.sendToken).toBeTruthy();
  }));
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service.getToken).toBeTruthy();
  }));
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service.isLoggednIn).toBeTruthy();
  }));
  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service.logout).toBeTruthy();
  }));
});
 