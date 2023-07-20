import { TestBed } from '@angular/core/testing';

import { MarketapiService } from './marketapi.service';

describe('MarketapiService', () => {
  let service: MarketapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
