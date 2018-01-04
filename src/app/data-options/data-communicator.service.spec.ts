import { TestBed, inject } from '@angular/core/testing';

import { DataCommunicatorService } from './data-communicator.service';

describe('DataCommunicatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataCommunicatorService]
    });
  });

  it('should be created', inject([DataCommunicatorService], (service: DataCommunicatorService) => {
    expect(service).toBeTruthy();
  }));
});
