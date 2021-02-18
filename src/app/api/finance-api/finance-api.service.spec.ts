import {TestBed} from '@angular/core/testing';

import {FinanceApiService} from './finance-api.service';

describe('FinanceApiService', () => {
  let service: FinanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
