import { TestBed } from '@angular/core/testing';

import { GenUniqueIdService } from './gen-unique-id.service';

describe('GenUniqueIdService', () => {
  let service: GenUniqueIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenUniqueIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
