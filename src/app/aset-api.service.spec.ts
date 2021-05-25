import { TestBed } from '@angular/core/testing';

import { AsetApiService } from './aset-api.service';

describe('AsetApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AsetApiService = TestBed.get(AsetApiService);
    expect(service).toBeTruthy();
  });
});
