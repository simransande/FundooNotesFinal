import { TestBed, inject } from '@angular/core/testing';

import { SocialloginConfigService } from './sociallogin-config.service';

describe('SocialloginConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialloginConfigService]
    });
  });

  it('should be created', inject([SocialloginConfigService], (service: SocialloginConfigService) => {
    expect(service).toBeTruthy();
  }));
});
