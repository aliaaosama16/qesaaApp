import { TestBed } from '@angular/core/testing';

import { SectionsProductsService } from './sections-products.service';

describe('SectionsProductsService', () => {
  let service: SectionsProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SectionsProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
