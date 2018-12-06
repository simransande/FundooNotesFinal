import { TestBed, inject } from '@angular/core/testing';

import { CreatelabelService } from './createlabel.service';

describe('CreatelabelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatelabelService]
    });
  });

  it('should be created', inject([CreatelabelService], (service: CreatelabelService) => {
    expect(service).toBeTruthy();
  }));
  it('should be created', inject([CreatelabelService], (service: CreatelabelService) => {
    expect(service.addLabel).toBeTruthy();
  }));
  it('should be created', inject([CreatelabelService], (service: CreatelabelService) => {
    expect(service.getLabel).toBeTruthy();
  }));
  it('should be created', inject([CreatelabelService], (service: CreatelabelService) => {
    expect(service.updatlabel).toBeTruthy();
  }));
  it('should be created', inject([CreatelabelService], (service: CreatelabelService) => {
    expect(service.deletelabel).toBeTruthy();
  }));
 
});
