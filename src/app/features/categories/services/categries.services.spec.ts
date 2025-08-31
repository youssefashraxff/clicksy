import { TestBed } from '@angular/core/testing';

import { CategriesServices } from './categries.services';

describe('CategriesServices', () => {
  let service: CategriesServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategriesServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
