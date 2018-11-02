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
});
