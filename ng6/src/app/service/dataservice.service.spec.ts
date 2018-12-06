import { TestBed, inject } from '@angular/core/testing';

import { DataserviceService } from './dataservice.service';

describe('DataserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataserviceService]
    });
  });
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.Login).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.Register).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.ForgotPass).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.RessetPass).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.uploadImage).toBeTruthy();
  }));
  it('should be created', inject([DataserviceService], (service: DataserviceService) => {
    expect(service.profileUploadinGet).toBeTruthy();
  }));

});
